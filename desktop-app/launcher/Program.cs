using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Management;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

internal static class Program
{
    private static void Main()
    {
        string baseDir = AppDomain.CurrentDomain.BaseDirectory;
        string webRoot = Path.Combine(baseDir, "web");

        if (!Directory.Exists(webRoot))
        {
            ShowErrorAndExit("没有找到 web 文件夹。请确认方舟.exe 与 web 文件夹在同一目录。");
            return;
        }

        int port = GetFreePort();
        string url = "http://127.0.0.1:" + port + "/";
        var cts = new CancellationTokenSource();
        var serverThread = new Thread(() => RunServer(webRoot, port, cts.Token));
        serverThread.IsBackground = true;
        serverThread.Start();

        try
        {
            string edgePath = FindEdge();
            if (edgePath == null)
            {
                ShowErrorAndExit("没有找到 Microsoft Edge。请安装 Edge 后再运行方舟。");
                return;
            }

            string profileDir = Path.Combine(baseDir, "AppData", "EdgeProfile");
            Directory.CreateDirectory(profileDir);

            var startInfo = new ProcessStartInfo();
            startInfo.FileName = edgePath;
            startInfo.Arguments = "--app=\"" + url + "\" --user-data-dir=\"" + profileDir + "\" --no-first-run --disable-features=Translate";
            startInfo.UseShellExecute = false;
            startInfo.CreateNoWindow = true;

            Process appProcess = Process.Start(startInfo);
            WaitForWindowToClose(appProcess, profileDir);
        }
        finally
        {
            cts.Cancel();
        }
    }

    private static void RunServer(string root, int port, CancellationToken token)
    {
        var listener = new TcpListener(IPAddress.Loopback, port);
        listener.Start();

        try
        {
            while (!token.IsCancellationRequested)
            {
                if (!listener.Pending())
                {
                    Thread.Sleep(50);
                    continue;
                }

                TcpClient client = listener.AcceptTcpClient();
                ThreadPool.QueueUserWorkItem(_ => HandleClient(client, root));
            }
        }
        finally
        {
            listener.Stop();
        }
    }

    private static void HandleClient(TcpClient client, string root)
    {
        using (client)
        using (NetworkStream stream = client.GetStream())
        using (var reader = new StreamReader(stream, Encoding.ASCII, false, 1024, true))
        {
            string requestLine = reader.ReadLine();
            if (string.IsNullOrWhiteSpace(requestLine))
            {
                return;
            }

            string header;
            do
            {
                header = reader.ReadLine();
            } while (!string.IsNullOrEmpty(header));

            string[] parts = requestLine.Split(' ');
            string rawPath = parts.Length > 1 ? parts[1] : "/";
            string filePath = ResolvePath(root, rawPath);

            if (filePath == null || !File.Exists(filePath))
            {
                WriteText(stream, "404 Not Found", "text/plain; charset=utf-8", 404);
                return;
            }

            byte[] bytes = File.ReadAllBytes(filePath);
            string mime = GetMimeType(filePath);
            byte[] headerBytes = Encoding.ASCII.GetBytes(
                "HTTP/1.1 200 OK\r\nContent-Type: " + mime + "\r\nContent-Length: " + bytes.Length + "\r\nCache-Control: no-store\r\nConnection: close\r\n\r\n"
            );
            stream.Write(headerBytes, 0, headerBytes.Length);
            stream.Write(bytes, 0, bytes.Length);
        }
    }

    private static string ResolvePath(string root, string rawPath)
    {
        string pathOnly = rawPath.Split('?', '#')[0];
        string decoded = Uri.UnescapeDataString(pathOnly);
        if (decoded == "/")
        {
            decoded = "/index.html";
        }

        decoded = decoded.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
        string fullPath = Path.GetFullPath(Path.Combine(root, decoded));
        string fullRoot = Path.GetFullPath(root);

        if (!fullPath.StartsWith(fullRoot, StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        return fullPath;
    }

    private static void WriteText(Stream stream, string text, string mime, int status)
    {
        byte[] body = Encoding.UTF8.GetBytes(text);
        byte[] header = Encoding.ASCII.GetBytes(
            "HTTP/1.1 " + status + " " + text + "\r\nContent-Type: " + mime + "\r\nContent-Length: " + body.Length + "\r\nConnection: close\r\n\r\n"
        );
        stream.Write(header, 0, header.Length);
        stream.Write(body, 0, body.Length);
    }

    private static int GetFreePort()
    {
        var listener = new TcpListener(IPAddress.Loopback, 0);
        listener.Start();
        int port = ((IPEndPoint)listener.LocalEndpoint).Port;
        listener.Stop();
        return port;
    }

    private static string FindEdge()
    {
        string[] candidates =
        {
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Microsoft", "Edge", "Application", "msedge.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Microsoft", "Edge", "Application", "msedge.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Microsoft", "Edge", "Application", "msedge.exe")
        };

        return candidates.FirstOrDefault(File.Exists);
    }

    private static void WaitForWindowToClose(Process launchedProcess, string profileDir)
    {
        Thread.Sleep(1200);

        while (IsEdgeProfileRunning(profileDir))
        {
            Thread.Sleep(800);
        }

        if (launchedProcess != null && !launchedProcess.HasExited)
        {
            launchedProcess.WaitForExit();
        }
    }

    private static bool IsEdgeProfileRunning(string profileDir)
    {
        try
        {
            using (var searcher = new ManagementObjectSearcher("SELECT CommandLine FROM Win32_Process WHERE Name='msedge.exe'"))
            {
                foreach (ManagementObject item in searcher.Get())
                {
                    string commandLine = item["CommandLine"] as string;
                    if (commandLine != null && commandLine.IndexOf(profileDir, StringComparison.OrdinalIgnoreCase) >= 0)
                    {
                        return true;
                    }
                }
            }
        }
        catch
        {
            return false;
        }

        return false;
    }

    private static string GetMimeType(string path)
    {
        switch (Path.GetExtension(path).ToLowerInvariant())
        {
            case ".html": return "text/html; charset=utf-8";
            case ".js": return "application/javascript; charset=utf-8";
            case ".css": return "text/css; charset=utf-8";
            case ".json": return "application/json; charset=utf-8";
            case ".png": return "image/png";
            case ".jpg":
            case ".jpeg": return "image/jpeg";
            case ".svg": return "image/svg+xml";
            case ".ttf": return "font/ttf";
            case ".woff": return "font/woff";
            case ".woff2": return "font/woff2";
            default: return "application/octet-stream";
        }
    }

    private static void ShowErrorAndExit(string message)
    {
        string temp = Path.Combine(Path.GetTempPath(), "fangzhou-launch-error.txt");
        File.WriteAllText(temp, message, Encoding.UTF8);
        Process.Start(new ProcessStartInfo { FileName = temp, UseShellExecute = true });
    }
}

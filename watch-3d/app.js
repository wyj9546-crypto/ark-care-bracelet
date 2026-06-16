import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const mount = document.querySelector("#watch-canvas");
const statusDot = document.querySelector("[data-status-dot]");
const statusLabel = document.querySelector("[data-status-label]");
const buttons = [...document.querySelectorAll("[data-mode]")];

const modes = {
  normal: {
    label: "正常守护 · 冷色呼吸",
    accent: new THREE.Color("#8dc7ff"),
    css: "#8dc7ff",
    emissive: 0.7,
  },
  warning: {
    label: "需要关注 · 暖色提醒",
    accent: new THREE.Color("#f6a05f"),
    css: "#f6a05f",
    emissive: 1.05,
  },
  rest: {
    label: "舒缓陪伴 · 青绿色放松",
    accent: new THREE.Color("#7fd6c2"),
    css: "#7fd6c2",
    emissive: 0.82,
  },
};

let activeMode = "normal";

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(4.2, 3.35, 8.2);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
mount.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.enablePan = false;
controls.minDistance = 5.0;
controls.maxDistance = 13.5;
controls.target.set(0, 0.08, -0.08);

const watch = new THREE.Group();
watch.rotation.set(-0.06, -0.2, -0.08);
scene.add(watch);

const materials = {
  strap: new THREE.MeshStandardMaterial({
    color: "#8d9676",
    roughness: 0.86,
    metalness: 0.02,
  }),
  strapInner: new THREE.MeshStandardMaterial({
    color: "#626b51",
    roughness: 0.9,
  }),
  tray: new THREE.MeshStandardMaterial({
    color: "#16181a",
    roughness: 0.65,
    metalness: 0.12,
  }),
  trayEdge: new THREE.MeshStandardMaterial({
    color: "#2b2c2b",
    roughness: 0.7,
  }),
  clearShell: new THREE.MeshPhysicalMaterial({
    color: "#eef1e7",
    transparent: true,
    opacity: 0.33,
    roughness: 0.08,
    metalness: 0,
    transmission: 0.48,
    thickness: 0.38,
    ior: 1.38,
  }),
  clearEdge: new THREE.MeshPhysicalMaterial({
    color: "#d7d4ca",
    transparent: true,
    opacity: 0.42,
    roughness: 0.18,
    transmission: 0.24,
    thickness: 0.24,
  }),
  board: new THREE.MeshStandardMaterial({
    color: "#17242d",
    roughness: 0.52,
    metalness: 0.18,
  }),
  chip: new THREE.MeshStandardMaterial({
    color: "#202020",
    roughness: 0.58,
    metalness: 0.08,
  }),
  copper: new THREE.MeshStandardMaterial({
    color: "#c88b38",
    roughness: 0.34,
    metalness: 0.62,
  }),
  gold: new THREE.MeshStandardMaterial({
    color: "#d2ae68",
    roughness: 0.28,
    metalness: 0.55,
  }),
  foam: new THREE.MeshStandardMaterial({
    color: "#cfc1a8",
    roughness: 0.96,
  }),
  blackGlass: new THREE.MeshStandardMaterial({
    color: "#0c1010",
    roughness: 0.18,
    metalness: 0.16,
  }),
  shadow: new THREE.ShadowMaterial({
    color: "#5c4635",
    opacity: 0.15,
  }),
};

const glowMaterial = new THREE.MeshStandardMaterial({
  color: modes.normal.accent,
  emissive: modes.normal.accent,
  emissiveIntensity: modes.normal.emissive,
  roughness: 0.18,
});

function roundedBox(width, height, depth, radius, smoothness = 8) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: smoothness,
    bevelSize: Math.min(radius * 0.34, depth * 0.3),
    bevelThickness: Math.min(radius * 0.34, depth * 0.3),
    steps: 1,
  });
  geometry.center();
  return geometry;
}

function addMesh(parent, geometry, material, position, rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function makeBandGeometry({ width = 1.12, thickness = 0.22, radiusY = 2.88, radiusZ = 1.72, zOffset = -1.18, segments = 152 }) {
  const vertices = [];
  const normals = [];
  const indices = [];

  for (let i = 0; i <= segments; i += 1) {
    const theta = (i / segments) * Math.PI * 2;
    const center = new THREE.Vector3(0, Math.cos(theta) * radiusY, zOffset + Math.sin(theta) * radiusZ);
    const outward = new THREE.Vector3(0, Math.cos(theta), Math.sin(theta)).normalize();
    const xAxis = new THREE.Vector3(1, 0, 0);
    const corners = [
      center.clone().addScaledVector(xAxis, -width / 2).addScaledVector(outward, thickness / 2),
      center.clone().addScaledVector(xAxis, width / 2).addScaledVector(outward, thickness / 2),
      center.clone().addScaledVector(xAxis, -width / 2).addScaledVector(outward, -thickness / 2),
      center.clone().addScaledVector(xAxis, width / 2).addScaledVector(outward, -thickness / 2),
    ];
    for (const corner of corners) {
      vertices.push(corner.x, corner.y, corner.z);
    }
    normals.push(
      outward.x, outward.y, outward.z,
      outward.x, outward.y, outward.z,
      -outward.x, -outward.y, -outward.z,
      -outward.x, -outward.y, -outward.z,
    );
  }

  for (let i = 0; i < segments; i += 1) {
    const a = i * 4;
    const b = (i + 1) * 4;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
    indices.push(a + 2, a + 3, b + 2, a + 3, b + 3, b + 2);
    indices.push(a, a + 2, b, a + 2, b + 2, b);
    indices.push(a + 1, b + 1, a + 3, a + 3, b + 1, b + 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function makeMicroLabel(text, position) {
  const canvas = document.createElement("canvas");
  canvas.width = 420;
  canvas.height = 104;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(255,253,248,0.88)";
  ctx.strokeStyle = "rgba(235,220,203,0.95)";
  ctx.lineWidth = 2;
  roundRect(ctx, 8, 18, 404, 68, 24);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#6c5a4d";
  ctx.font = "500 30px Microsoft YaHei, PingFang SC, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 210, 52);

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(canvas),
      transparent: true,
      depthTest: false,
    }),
  );
  sprite.position.set(...position);
  sprite.scale.set(1.35, 0.34, 1);
  return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function buildStrap() {
  const group = new THREE.Group();
  const band = addMesh(group, makeBandGeometry({}), materials.strap, [0, 0, 0]);
  band.renderOrder = 0;

  const innerShade = addMesh(
    group,
    makeBandGeometry({ width: 1.02, thickness: 0.045, radiusY: 2.6, radiusZ: 1.43, zOffset: -1.2, segments: 152 }),
    materials.strapInner,
    [0, 0, 0],
  );
  innerShade.renderOrder = 1;

  addMesh(group, roundedBox(1.36, 0.42, 0.34, 0.12), materials.strap, [0, 2.56, -0.26], [0.04, 0, 0]);
  addMesh(group, roundedBox(1.36, 0.42, 0.34, 0.12), materials.strap, [0, -2.56, -0.26], [-0.04, 0, 0]);
  addMesh(group, roundedBox(1.42, 0.44, 0.28, 0.1), materials.strap, [0, -2.92, -1.05], [-0.35, 0, 0]);

  for (let i = 0; i < 9; i += 1) {
    const theta = 3.64 + i * 0.115;
    const y = Math.cos(theta) * 2.9;
    const z = -1.18 + Math.sin(theta) * 1.72;
    const hole = addMesh(group, roundedBox(0.12, 0.27, 0.035, 0.035, 5), materials.strapInner, [-0.49, y, z + 0.03], [0.18, 0, -0.04]);
    hole.scale.x = 1.15;
  }

  addMesh(group, roundedBox(1.38, 0.52, 0.28, 0.13), materials.strap, [0, -1.95, -2.64], [-0.25, 0, 0]);
  return group;
}

function buildCapsule() {
  const group = new THREE.Group();
  addMesh(group, roundedBox(1.68, 4.58, 0.56, 0.5, 16), materials.tray, [0, 0, -0.1], [0, 0, 0]);
  addMesh(group, roundedBox(1.86, 4.86, 0.28, 0.52, 18), materials.clearEdge, [0, 0, 0.18], [0, 0, 0]);
  const clear = addMesh(group, roundedBox(1.94, 4.98, 0.58, 0.54, 22), materials.clearShell, [0, 0, 0.48], [0, 0, 0]);
  clear.renderOrder = 5;

  addMesh(group, roundedBox(0.08, 4.2, 0.1, 0.035, 5), materials.clearEdge, [-0.98, 0, 0.78]);
  addMesh(group, roundedBox(0.08, 4.2, 0.1, 0.035, 5), materials.clearEdge, [0.98, 0, 0.78]);
  return group;
}

function buildCircuitBoard() {
  const group = new THREE.Group();
  addMesh(group, roundedBox(1.18, 3.94, 0.09, 0.13, 8), materials.board, [0, 0, 0.57]);

  addMesh(group, roundedBox(0.64, 0.82, 0.12, 0.05, 5), materials.chip, [0.04, 0.54, 0.66]);
  addMesh(group, roundedBox(0.48, 0.42, 0.09, 0.04, 5), materials.chip, [-0.18, -0.53, 0.65]);
  addMesh(group, roundedBox(0.35, 0.32, 0.08, 0.04, 5), materials.chip, [0.36, -1.13, 0.64]);

  const micRing = addMesh(group, new THREE.CylinderGeometry(0.23, 0.23, 0.1, 48), materials.gold, [0.46, 1.62, 0.72], [Math.PI / 2, 0, 0]);
  const micHole = addMesh(group, new THREE.CylinderGeometry(0.125, 0.125, 0.105, 48), materials.blackGlass, [0.46, 1.62, 0.78], [Math.PI / 2, 0, 0]);
  micRing.renderOrder = 7;
  micHole.renderOrder = 8;

  addMesh(group, roundedBox(0.58, 0.42, 0.075, 0.04, 4), materials.foam, [-0.28, 1.78, 0.72], [0, 0, -0.08]);
  addMesh(group, roundedBox(0.5, 0.5, 0.1, 0.06, 5), materials.gold, [0.26, -1.48, 0.7], [0, 0, 0.12]);
  addMesh(group, roundedBox(0.54, 0.42, 0.08, 0.04, 4), materials.foam, [-0.28, -1.75, 0.71], [0, 0, 0.12]);

  for (let row = 0; row < 20; row += 1) {
    for (const side of [-1, 1]) {
      addMesh(group, new THREE.BoxGeometry(0.045, 0.12, 0.035), materials.copper, [side * 0.66, -1.7 + row * 0.17, 0.66]);
    }
  }

  for (let i = 0; i < 18; i += 1) {
    const x = -0.43 + (i % 4) * 0.28;
    const y = -1.32 + Math.floor(i / 4) * 0.35;
    addMesh(group, new THREE.BoxGeometry(0.08, 0.14, 0.04), i % 3 === 0 ? materials.copper : materials.chip, [x, y, 0.68]);
  }

  return group;
}

function buildBackModule() {
  const group = new THREE.Group();
  addMesh(group, roundedBox(1.02, 0.6, 0.08, 0.16, 10), materials.blackGlass, [0, -0.22, -0.48]);
  for (let i = 0; i < 4; i += 1) {
    addMesh(group, roundedBox(0.13, 0.1, 0.04, 0.025, 4), glowMaterial, [-0.23 + i * 0.15, -0.22, -0.53]);
  }
  addMesh(group, roundedBox(0.16, 0.48, 0.07, 0.05, 5), materials.gold, [-0.76, -0.22, -0.46]);
  addMesh(group, roundedBox(0.16, 0.48, 0.07, 0.05, 5), materials.gold, [0.76, -0.22, -0.46]);
  return group;
}

const strap = buildStrap();
const capsule = buildCapsule();
const board = buildCircuitBoard();
const backModule = buildBackModule();
watch.add(strap, backModule, capsule, board);

const glowRailTop = addMesh(watch, roundedBox(1.55, 0.055, 0.04, 0.02, 4), glowMaterial, [0, 2.22, 0.88]);
const glowRailBottom = addMesh(watch, roundedBox(1.55, 0.055, 0.04, 0.02, 4), glowMaterial, [0, -2.22, 0.88]);
const glowSideLeft = addMesh(watch, roundedBox(0.055, 4.3, 0.04, 0.02, 4), glowMaterial, [-0.89, 0, 0.88]);
const glowSideRight = addMesh(watch, roundedBox(0.055, 4.3, 0.04, 0.02, 4), glowMaterial, [0.89, 0, 0.88]);
const glowPieces = [glowRailTop, glowRailBottom, glowSideLeft, glowSideRight];

const labelGroup = new THREE.Group();
labelGroup.add(makeMicroLabel("麦克风", [1.7, 1.72, 1.08]));
labelGroup.add(makeMicroLabel("ESP32-C3 主控", [2.02, 0.34, 1.08]));
labelGroup.add(makeMicroLabel("压力传感器", [1.92, -1.6, 1.06]));
labelGroup.add(makeMicroLabel("柔性腕带", [-1.94, -1.42, -0.25]));
watch.add(labelGroup);

const keyLight = new THREE.DirectionalLight("#fff8ee", 3.2);
keyLight.position.set(4.3, 7.2, 6.2);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
scene.add(keyLight);
scene.add(new THREE.HemisphereLight("#fff4e7", "#6b7765", 2.5));

const accentLight = new THREE.PointLight(modes.normal.accent, 1.75, 7);
accentLight.position.set(0.1, 0.1, 2.2);
scene.add(accentLight);

const floor = new THREE.Mesh(new THREE.CircleGeometry(4.2, 96), materials.shadow);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -3.22;
floor.receiveShadow = true;
scene.add(floor);

let compactViewport = false;

function resize() {
  const width = mount.clientWidth;
  const height = mount.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const nextCompact = width < 560;
  labelGroup.visible = !nextCompact;
  if (nextCompact !== compactViewport) {
    camera.position.set(nextCompact ? 4.65 : 4.2, nextCompact ? 3.65 : 3.35, nextCompact ? 10.1 : 8.2);
    controls.minDistance = nextCompact ? 6.8 : 5.0;
    controls.maxDistance = nextCompact ? 15 : 13.5;
    controls.target.set(0, 0.08, -0.08);
    controls.update();
    compactViewport = nextCompact;
  }
}

function setMode(mode) {
  activeMode = mode;
  const next = modes[mode];
  glowMaterial.color.copy(next.accent);
  glowMaterial.emissive.copy(next.accent);
  glowMaterial.emissiveIntensity = next.emissive;
  accentLight.color.copy(next.accent);
  statusDot.style.background = next.css;
  statusDot.style.boxShadow = `0 0 18px ${next.css}`;
  statusLabel.textContent = next.label;
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === mode);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

renderer.domElement.addEventListener("dblclick", () => {
  camera.position.set(compactViewport ? 4.65 : 4.2, compactViewport ? 3.65 : 3.35, compactViewport ? 10.1 : 8.2);
  controls.target.set(0, 0.08, -0.08);
  controls.update();
});

window.addEventListener("resize", resize);
resize();
setMode("normal");

const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();
  const pulse = 0.52 + Math.sin(t * 2.1) * 0.18;
  glowMaterial.emissiveIntensity = modes[activeMode].emissive + pulse * 0.34;
  accentLight.intensity = 1.25 + pulse * 0.75;
  for (const piece of glowPieces) {
    piece.scale.z = 1 + pulse * 0.16;
  }
  watch.rotation.y += 0.0012;
  labelGroup.children.forEach((label) => label.lookAt(camera.position));
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

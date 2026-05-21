import Phaser from 'phaser';

const TILE  = 32;
const SPEED = 160;
const INTERACT_DIST = 80;

const G = 0, P = 1, W = 2;

// 20 cols × 15 rows — cross-shaped path connecting 4 building quadrants
const MAP = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W],
  [W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W],
  [W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W],
  [W,G,G,P,P,G,G,G,G,G,G,G,G,G,G,P,P,G,G,W],
  [W,G,G,P,P,G,G,G,G,G,G,G,G,G,G,P,P,G,G,W],
  [W,G,G,P,P,G,G,G,G,G,G,G,G,G,G,P,P,G,G,W],
  [W,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,W],
  [W,G,G,P,P,G,G,G,G,G,G,G,G,G,G,P,P,G,G,W],
  [W,G,G,P,P,G,G,G,G,G,G,G,G,G,G,P,P,G,G,W],
  [W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W],
  [W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W],
  [W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W],
  [W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

// Buildings — pixel positions (top-left corner), pixel size
const BUILDINGS = [
  {
    id: 'about',
    px: 32,  py: 32,  pw: 160, ph: 96,
    wallColor: 0xc8a66b, roofColor: 0x7a4a28, roofDark: 0x4e2e18,
    winColor: 0xaadcf5,  accentColor: 0xffd700,
    label: 'ABOUT ME',
    doorSouth: true,
  },
  {
    id: 'projects',
    px: 448, py: 32,  pw: 160, ph: 96,
    wallColor: 0x5a7faa, roofColor: 0x2e4a6e, roofDark: 0x1e2e46,
    winColor: 0xb8d8ff,  accentColor: 0x4a9eff,
    label: 'PROJECTS',
    doorSouth: true,
  },
  {
    id: 'achievements',
    px: 32,  py: 320, pw: 160, ph: 96,
    wallColor: 0xd4925a, roofColor: 0x6e3e20, roofDark: 0x462814,
    winColor: 0xffd0a0,  accentColor: 0xff8c42,
    label: 'ACHIEVEMENTS',
    doorSouth: false,   // door on north face — player approaches from the south path
  },
  {
    id: 'contact',
    px: 448, py: 320, pw: 160, ph: 96,
    wallColor: 0x5aaa7a, roofColor: 0x2e6040, roofDark: 0x1e3e28,
    winColor: 0xa0ffd8,  accentColor: 0x00e676,
    label: 'CONTACT',
    doorSouth: false,
  },
];

const TREES = [
  { col: 7, row: 2 }, { col: 12, row: 2 },
  { col: 7, row: 12 }, { col: 12, row: 12 },
  { col: 2, row: 5 }, { col: 17, row: 5 },
  { col: 2, row: 9 }, { col: 17, row: 9 },
  { col: 9, row: 4 }, { col: 10, row: 10 },
];

const FLOWERS = [
  { col: 5,  row: 3,  color: 0xff6b9d }, { col: 14, row: 3,  color: 0x9b6bff },
  { col: 5,  row: 11, color: 0xff9b6b }, { col: 14, row: 11, color: 0x6bffb8 },
  { col: 8,  row: 5,  color: 0xffd700 }, { col: 11, row: 5,  color: 0xff6b6b },
  { col: 8,  row: 9,  color: 0x6bffd7 }, { col: 11, row: 9,  color: 0xffb86b },
  { col: 6,  row: 13, color: 0xff8cff }, { col: 13, row: 13, color: 0x8cffff },
];

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    this.joyVec        = { x: 0, y: 0 };
    this.touchInteract = false;
    this._joyPtrId     = null;
    this.nearbyBuilding = null;
  }

  preload() {
    this.load.image('player', this.registry.get('logoSrc'));
  }

  create() {
    const mapW = MAP[0].length * TILE;
    const mapH = MAP.length    * TILE;

    this.physics.world.setBounds(0, 0, mapW, mapH);

    this.drawMap();
    this.drawFlowers();
    this.drawTrees();
    this.drawBuildings();
    this.drawLampposts();

    this.walls  = this.buildWalls();
    this.player = this.buildPlayer();
    this.physics.add.collider(this.player, this.walls);

    this.cameras.main.setBounds(0, 0, mapW, mapH);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd    = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.W,
      down:  Phaser.Input.Keyboard.KeyCodes.S,
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.buildHUD();
    this.buildTouchControls();
  }

  // ── Map ────────────────────────────────────────────────────

  drawMap() {
    const g = this.add.graphics();

    MAP.forEach((row, ri) => {
      row.forEach((tile, ci) => {
        const x = ci * TILE, y = ri * TILE;

        if (tile === G) {
          const alt = (ci * 3 + ri * 7) % 11 < 3;
          g.fillStyle(alt ? 0x356a22 : 0x2d5c1e);
          g.fillRect(x, y, TILE, TILE);
          g.lineStyle(1, 0x264d17, 0.3);
          g.strokeRect(x, y, TILE, TILE);
          // Grass tufts (deterministic pattern)
          if ((ci + ri * 4) % 6 === 0) {
            g.fillStyle(0x3e7c28, 0.8);
            g.fillRect(x + 4,  y + 20, 2, 8);
            g.fillRect(x + 6,  y + 17, 2, 6);
          }
          if ((ci * 2 + ri) % 9 === 0) {
            g.fillStyle(0x3e7c28, 0.8);
            g.fillRect(x + 22, y + 8, 2, 8);
            g.fillRect(x + 24, y + 6, 2, 6);
          }

        } else if (tile === P) {
          g.fillStyle(0xa8906e);
          g.fillRect(x, y, TILE, TILE);
          g.fillStyle(0xb89c7a);
          if ((ci + ri) % 2 === 0) {
            g.fillRect(x + 2, y + 2,           TILE - 4, TILE / 2 - 2);
            g.fillRect(x + 2, y + TILE / 2,    TILE - 4, TILE / 2 - 2);
          } else {
            g.fillRect(x + 2,          y + 2, TILE / 2 - 2, TILE - 4);
            g.fillRect(x + TILE / 2,   y + 2, TILE / 2 - 2, TILE - 4);
          }
          g.lineStyle(1, 0x8a7260, 0.55);
          g.strokeRect(x, y, TILE, TILE);

        } else if (tile === W) {
          g.fillStyle(0x18182a);
          g.fillRect(x, y, TILE, TILE);
          g.fillStyle(0x22223a);
          g.fillRect(x + 2, y + 2,  TILE - 4, 12);
          g.fillRect(x + 2, y + 18, TILE - 4, 12);
        }
      });
    });
  }

  drawFlowers() {
    const g = this.add.graphics();
    FLOWERS.forEach(({ col, row, color }) => {
      const cx = col * TILE + 16, cy = row * TILE + 22;
      g.fillStyle(0x2d7a1a);
      g.fillRect(cx - 1, cy, 2, 6);
      g.fillStyle(color);
      g.fillRect(cx - 3, cy - 2, 3, 3);
      g.fillRect(cx + 1, cy - 2, 3, 3);
      g.fillRect(cx - 1, cy - 4, 3, 3);
      g.fillRect(cx - 1, cy,     3, 3);
      g.fillStyle(0xffffff);
      g.fillRect(cx - 1, cy - 2, 3, 3);
    });
  }

  drawTrees() {
    const g = this.add.graphics();
    TREES.forEach(({ col, row }) => {
      const cx = col * TILE + 16, cy = row * TILE + 16;
      // Trunk
      g.fillStyle(0x6b4226);
      g.fillRect(cx - 4, cy + 6, 8, 16);
      g.fillStyle(0x4e2e18);
      g.fillRect(cx + 1, cy + 8, 2, 12);
      // Canopy
      g.fillStyle(0x1e6e1e);
      g.fillRect(cx - 14, cy - 4, 28, 12);
      g.fillStyle(0x228b22);
      g.fillRect(cx - 11, cy - 12, 22, 10);
      g.fillStyle(0x2aaa2a);
      g.fillRect(cx - 7,  cy - 19, 14, 9);
      g.fillStyle(0x3ec83e, 0.4);
      g.fillRect(cx - 4,  cy - 17, 4, 4);
    });
  }

  drawBuildings() {
    BUILDINGS.forEach(b => this._drawBuilding(b));
  }

  _drawBuilding(b) {
    const { px, py, pw, ph, wallColor, roofColor, roofDark, winColor, accentColor, label, doorSouth } = b;
    const g = this.add.graphics();

    // Drop shadow
    g.fillStyle(0x000000, 0.3);
    g.fillRect(px + 6, py + 10, pw, ph);

    // ── Wall ──────────────────────────────────────────────────
    g.fillStyle(wallColor);
    g.fillRect(px, py, pw, ph);

    // Brick mortar — horizontal
    g.lineStyle(1, 0x000000, 0.12);
    for (let r = 0; r <= Math.ceil(ph / 10); r++) {
      g.moveTo(px, py + r * 10);
      g.lineTo(px + pw, py + r * 10);
    }
    // Brick mortar — vertical (staggered)
    for (let r = 0; r < Math.ceil(ph / 10); r++) {
      const off = r % 2 === 0 ? 0 : 18;
      for (let c = 0; c <= Math.ceil(pw / 36) + 1; c++) {
        const bx = px + c * 36 + off;
        g.moveTo(bx, py + r * 10);
        g.lineTo(bx, py + (r + 1) * 10);
      }
    }
    g.strokePath();

    // ── Windows ───────────────────────────────────────────────
    const winY = py + 14, winW = 22, winH = 20;
    [px + 16, px + pw - 38].forEach(wx => {
      g.fillStyle(0x333344);
      g.fillRect(wx - 2, winY - 2, winW + 4, winH + 4);
      g.fillStyle(winColor);
      g.fillRect(wx, winY, winW, winH);
      g.fillStyle(0x000000, 0.15);
      g.fillRect(wx + winW / 2, winY, winW / 2, winH);
      g.fillStyle(0x333344);
      g.fillRect(wx + winW / 2 - 1, winY, 2, winH);
      g.fillRect(wx, winY + winH / 2 - 1, winW, 2);
    });

    // ── Door ──────────────────────────────────────────────────
    const doorW = 22, doorH = 30;
    const doorX = px + pw / 2 - doorW / 2;
    const doorY = doorSouth ? py + ph - doorH : py;

    g.fillStyle(0x3e2010);
    g.fillRect(doorX - 2, doorY - (doorSouth ? 2 : 0), doorW + 4, doorH + 2);
    g.fillStyle(0x6b3e1e);
    g.fillRect(doorX, doorY, doorW, doorH);
    g.fillStyle(0x7a4e28);
    g.fillRect(doorX + 3, doorY + 3, doorW - 6, doorH - 8);
    // Handle
    g.fillStyle(accentColor);
    g.fillRect(doorSouth ? doorX + doorW - 6 : doorX + 2, doorY + doorH / 2 - 3, 4, 6);
    // Doorstep
    g.fillStyle(0xa0906e);
    const stepY = doorSouth ? doorY + doorH : doorY - 4;
    g.fillRect(doorX - 4, stepY, doorW + 8, 4);

    // ── Roof (stepped shingles) ────────────────────────────────
    const roofRows = 4, stepH = 8;
    const roofColors = [roofDark, roofColor, roofDark, roofColor];
    for (let r = 0; r < roofRows; r++) {
      const rw = pw + (roofRows - r) * 6;
      const rx = px - (roofRows - r) * 3;
      const ry = py - (roofRows - r) * stepH;
      g.fillStyle(roofColors[r]);
      g.fillRect(rx, ry, rw, stepH);
      // Shingle lines
      g.lineStyle(1, 0x000000, 0.18);
      for (let s = 0; s < Math.ceil(rw / 14); s++) {
        g.moveTo(rx + s * 14, ry);
        g.lineTo(rx + s * 14, ry + stepH);
      }
      g.strokePath();
    }
    // Ridge cap
    g.fillStyle(roofDark);
    g.fillRect(px + pw * 0.2, py - roofRows * stepH - 4, pw * 0.6, 6);

    // ── Accent border ──────────────────────────────────────────
    g.lineStyle(3, accentColor);
    g.strokeRect(px, py, pw, ph);

    // ── Name sign ─────────────────────────────────────────────
    this.add.text(px + pw / 2, py - roofRows * stepH - 22, label, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#' + accentColor.toString(16).padStart(6, '0'),
      backgroundColor: '#0f0f1a',
      padding: { x: 8, y: 4 },
      stroke: '#000000',
      strokeThickness: 1,
    }).setOrigin(0.5);
  }

  drawLampposts() {
    const g = this.add.graphics();
    [5, 8, 11, 14].forEach(col => {
      [6, 8].forEach(row => {
        const cx = col * TILE + 16, cy = row * TILE + 16;
        g.fillStyle(0x8a8aaa);
        g.fillRect(cx - 2, cy - 8, 4, 24);
        g.fillStyle(0x6a6a8a);
        g.fillRect(cx - 4, cy + 14, 8, 4);
        g.fillRect(cx - 6, cy - 10, 12, 6);
        g.fillStyle(0xfff7aa, 0.95);
        g.fillRect(cx - 4, cy - 8, 8, 4);
        g.fillStyle(0xfff7aa, 0.25);
        g.fillRect(cx - 8, cy - 9, 16, 7);
      });
    });
  }

  // ── Physics ────────────────────────────────────────────────

  buildWalls() {
    const pg = this.make.graphics({ x: 0, y: 0, add: false });
    pg.fillStyle(0xffffff);
    pg.fillRect(0, 0, TILE, TILE);
    pg.generateTexture('wall_tex', TILE, TILE);
    pg.destroy();

    const group = this.physics.add.staticGroup();

    MAP.forEach((row, ri) => {
      row.forEach((tile, ci) => {
        if (tile === W) {
          const s = group.create(ci * TILE + TILE / 2, ri * TILE + TILE / 2, 'wall_tex');
          s.setAlpha(0); s.refreshBody();
        }
      });
    });

    // Building footprints
    BUILDINGS.forEach(({ px, py, pw, ph }) => {
      const cols = Math.ceil(pw / TILE), rows = Math.ceil(ph / TILE);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const s = group.create(px + c * TILE + TILE / 2, py + r * TILE + TILE / 2, 'wall_tex');
          s.setAlpha(0); s.refreshBody();
        }
      }
    });

    // Tree stumps
    TREES.forEach(({ col, row }) => {
      const s = group.create(col * TILE + TILE / 2, row * TILE + TILE / 2, 'wall_tex');
      s.setAlpha(0); s.refreshBody();
    });

    return group;
  }

  buildPlayer() {
    const sprite = this.physics.add.sprite(304, 240, 'player');
    sprite.setDisplaySize(28, 28);
    sprite.setCollideWorldBounds(true);
    sprite.body.setSize(18, 18);
    sprite.setDepth(5);
    return sprite;
  }

  // ── HUD ────────────────────────────────────────────────────

  buildHUD() {
    const W = this.scale.width;
    const H = this.scale.height;
    const isTouch = this.sys.game.device.input.touch;

    if (!isTouch) {
      this.add.text(8, H - 30, 'ARROWS / WASD : MOVE     E : INTERACT', {
        fontFamily: 'monospace', fontSize: '10px', color: '#555',
        backgroundColor: '#0f0f1a', padding: { x: 6, y: 4 },
      }).setScrollFactor(0).setDepth(20);

      this.add.text(W - 8, H - 30, 'ESC : BACK TO MENU', {
        fontFamily: 'monospace', fontSize: '10px', color: '#555',
        backgroundColor: '#0f0f1a', padding: { x: 6, y: 4 },
      }).setScrollFactor(0).setDepth(20).setOrigin(1, 0);
    }

    const promptY = isTouch ? H - 170 : H - 64;
    this.promptBox = this.add.text(W / 2, promptY, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#ffd700',
      backgroundColor: '#1a1a2e', padding: { x: 14, y: 7 },
      stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20).setVisible(false);

    this.input.keyboard.on('keydown-ESC', () => {
      const navigate = this.registry.get('navigate');
      if (navigate) navigate('/');
    });
  }

  // ── Update ─────────────────────────────────────────────────

  update() {
    if (this.registry.get('modalOpen')) {
      this.player.setVelocity(0, 0);
      return;
    }
    this.move();
    this.checkProximity();
    this.handleInteract();
  }

  move() {
    const L = this.cursors.left.isDown  || this.wasd.left.isDown;
    const R = this.cursors.right.isDown || this.wasd.right.isDown;
    const U = this.cursors.up.isDown    || this.wasd.up.isDown;
    const D = this.cursors.down.isDown  || this.wasd.down.isDown;

    let vx = (R ? 1 : 0) - (L ? 1 : 0);
    let vy = (D ? 1 : 0) - (U ? 1 : 0);
    if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; }

    vx += this.joyVec.x;
    vy += this.joyVec.y;
    const len = Math.sqrt(vx * vx + vy * vy);
    if (len > 1) { vx /= len; vy /= len; }

    this.player.setVelocity(vx * SPEED, vy * SPEED);
  }

  checkProximity() {
    let nearest = null, nearestDist = INTERACT_DIST;

    BUILDINGS.forEach(b => {
      const doorX = b.px + b.pw / 2;
      const doorY = b.doorSouth ? b.py + b.ph : b.py;
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, doorX, doorY);
      if (d < nearestDist) { nearestDist = d; nearest = b; }
    });

    this.nearbyBuilding = nearest;
    if (nearest) {
      this.promptBox.setText(`[ E ]  ENTER — ${nearest.label}`);
      this.promptBox.setVisible(true);
    } else {
      this.promptBox.setVisible(false);
    }
  }

  handleInteract() {
    if (!this.nearbyBuilding) return;
    const keyPressed   = Phaser.Input.Keyboard.JustDown(this.eKey);
    const tapped       = this.touchInteract;
    this.touchInteract = false;
    if (!keyPressed && !tapped) return;

    const openModal = this.registry.get('openModal');
    if (openModal) {
      this.registry.set('modalOpen', true);
      openModal(this.nearbyBuilding.id);
    }
  }

  // ── Touch controls ─────────────────────────────────────────

  buildTouchControls() {
    if (!this.sys.game.device.input.touch) return;

    const W = this.scale.width, H = this.scale.height;
    const JX = 80, JY = H - 100, JR = 50, TR = 22;
    const BX = W - 80, BY = H - 100;

    this.input.addPointer(1);

    const joyBase = this.add.graphics();
    joyBase.fillStyle(0xffffff, 0.1);
    joyBase.fillCircle(0, 0, JR);
    joyBase.lineStyle(2, 0xffffff, 0.35);
    joyBase.strokeCircle(0, 0, JR);
    joyBase.setPosition(JX, JY).setScrollFactor(0).setDepth(30);

    const joyThumb = this.add.graphics();
    joyThumb.fillStyle(0xffffff, 0.55);
    joyThumb.fillCircle(0, 0, TR);
    joyThumb.setPosition(JX, JY).setScrollFactor(0).setDepth(31);

    const btn = this.add.graphics();
    btn.fillStyle(0xffd700, 0.85);
    btn.fillCircle(0, 0, 36);
    btn.lineStyle(3, 0x886e00);
    btn.strokeCircle(0, 0, 36);
    btn.setPosition(BX, BY).setScrollFactor(0).setDepth(30);

    this.add.text(BX, BY, '!', {
      fontFamily: 'monospace', fontSize: '24px', fontStyle: 'bold', color: '#000',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(31);

    const back = this.add.text(12, 12, '◀ MENU', {
      fontFamily: 'monospace', fontSize: '11px', color: '#aaa',
      backgroundColor: '#0f0f1a', padding: { x: 8, y: 5 },
    }).setScrollFactor(0).setDepth(30).setInteractive({ useHandCursor: true });
    back.on('pointerdown', () => {
      const navigate = this.registry.get('navigate');
      if (navigate) navigate('/');
    });

    this.input.on('pointerdown', (ptr) => {
      if (ptr.x < W / 2 && ptr.y > H * 0.6 && this._joyPtrId === null) {
        this._joyPtrId = ptr.id;
        this._moveJoystick(ptr, joyThumb, JX, JY, JR);
      }
      if (Phaser.Math.Distance.Between(ptr.x, ptr.y, BX, BY) < 50)
        this.touchInteract = true;
    });

    this.input.on('pointermove', (ptr) => {
      if (ptr.id === this._joyPtrId) this._moveJoystick(ptr, joyThumb, JX, JY, JR);
    });

    this.input.on('pointerup', (ptr) => {
      if (ptr.id === this._joyPtrId) {
        this._joyPtrId = null;
        this.joyVec = { x: 0, y: 0 };
        joyThumb.setPosition(JX, JY);
      }
    });
  }

  _moveJoystick(ptr, thumb, bx, by, maxR) {
    const dx = ptr.x - bx, dy = ptr.y - by;
    const len = Math.sqrt(dx * dx + dy * dy);
    const clamped = Math.min(len, maxR);
    const angle = Math.atan2(dy, dx);
    thumb.setPosition(bx + Math.cos(angle) * clamped, by + Math.sin(angle) * clamped);
    const r = clamped / maxR;
    this.joyVec = { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  }
}

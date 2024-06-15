import {Scene} from 'phaser';

export default class MainGame extends Scene
{
    constructor() {
        super('MainGame');
    }

    preload() {
        this.load.setBaseURL('assets');
        this.load.aseprite([
            {key: 'king', textureURL: 'KingHuman.png', atlasURL: 'KingHuman.json'},
            {key: 'pig', textureURL: 'Pig.png', atlasURL: 'Pig.json'},
        ]);
    }

    create() {
        this.isKingAttack = false;
        this.isPigDead = false;

        const platform = this.add.rectangle(400, 400, 100, 20, 0xffffff);

        this.anims.createFromAseprite('king', undefined, this.king);
        this.anims.createFromAseprite('pig', undefined, this.pig);

        this.pig = this.add.sprite(430, 300, 'pig').setName('pig');
        this.king = this.add.sprite(380, 300, 'king').setName('king');

        this.king.anims.play({
            key: 'KingHuman-Idle',
            repeat: -1,
        });

        this.pig.anims.play({
            key: 'Pig-Idle',
            repeat: -1,
        });

        // 给游戏对象添加物理体
        this.physics.add.existing(this.king);
        this.physics.add.existing(this.pig);
        // 参数2为true时表示为静态物理体
        this.physics.add.existing(platform, true);

        this.king.on('animationcomplete', (e) => {
            if (e.key === 'KingHuman-Attack') {
                this.isKingAttack = false;
            }
        });

        // 设置物理体尺寸
        this.king.body.setSize(20, 28);
        this.king.body.setOffset(39, 38);
        this.pig.body.setSize(20, 20);

        /* this.physics.add.existing(platform, true) 另一个写法
            // 允许重力
            platform.body.allowGravity = false;
            // 禁止移动
            platform.body.immovable = true;
        */

        this.kingAttackZone = this.add.zone(400, 300, 16, 16);
        this.physics.add.existing(this.kingAttackZone);
        this.kingAttackZone.body.allowGravity = false;

        // 启动碰撞
        this.physics.add.collider(this.king, platform);
        this.physics.add.collider(this.pig, platform);
        this.physics.add.overlap(this.kingAttackZone, this.pig, (a, b) => {
            if (this.isKingAttack && !this.isPigDead) {
                this.isPigDead = true;
                this.pig.anims.play({
                    key: 'Pig-Dead',
                    repeat: 0,
                });
            }
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setZoom(2);
    }

    update() {
        if (this.king.flipX) {
            this.kingAttackZone.x = this.king.x - 32;
        } else {
            this.kingAttackZone.x = this.king.x + 32;
        }
        this.kingAttackZone.y = this.king.y;

        if (this.cursors.left.isDown) {
            this.king.setFlipX(true);
            this.king.body.setVelocityX(-100);
            if (!this.isKingAttack) {
                this.king.anims.play({
                    key: 'KingHuman-Run',
                    repeat: -1,
                }, true);
            }
        }
        if (this.cursors.right.isDown) {
            this.king.setFlipX(false);
            this.king.body.setVelocityX(100);
            if (!this.isKingAttack) {
                this.king.anims.play({
                    key: 'KingHuman-Run',
                    repeat: -1,
                }, true);
            }
        }
        if (this.cursors.up.isDown && this.king.body.onFloor()) {
            this.king.body.setVelocityY(-300);
            if (!this.isKingAttack) {
                this.king.anims.play({
                    key: 'KingHuman-Jumps',
                    repeat: 0,
                }, true);
            }
        }

        if (this.cursors.left.isUp && this.cursors.right.isUp) {
            this.king.body.setVelocityX(0);
            if (!this.isKingAttack) {
                this.king.anims.play({
                    key: 'KingHuman-Idle',
                    repeat: -1,
                }, true);
            }
        }

        if (this.cursors.space.isDown && this.king.body.onFloor()) {
            if (!this.isKingAttack) {
                this.isKingAttack = true;

                this.king.anims.play({
                    key: 'KingHuman-Attack',
                    repeat: 0,
                }, true);
            }
        }

        if (this.king.body.velocity.y < 0) {
            this.king.setTexture('king', 11);
        }
        if (this.king.body.velocity.y > 0) {
            this.king.setTexture('king', 12);
        }
    }
}

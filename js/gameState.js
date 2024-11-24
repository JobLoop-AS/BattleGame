class GameState {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.currentTurn = 'player';
        this.isGameOver = false;
    }

    playerTurn(action) {
        if (this.isGameOver || this.currentTurn !== 'player') return;

        let result = null;
        if (action === 'attack') {
            result = this.player.attackTarget(this.enemy);
        } else if (action === 'heal') {
            this.player.heal(20);
        }

        return {
            action: action,
            result: result,
            targetDefeated: !this.enemy.isAlive
        };
    }

    enemyTurn() {
        if (this.isGameOver) return null;
        
        const result = this.enemy.attackTarget(this.player);
        return {
            result: result,
            targetDefeated: !this.player.isAlive
        };
    }
}
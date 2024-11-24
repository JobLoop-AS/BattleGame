class GameUI {
    constructor(gameState) {
        this.gameState = gameState;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('attackBtn').addEventListener('click', () => this.handlePlayerAction('attack'));
        document.getElementById('healBtn').addEventListener('click', () => this.handlePlayerAction('heal'));
    }

    handlePlayerAction(action) {
        if (this.gameState.currentTurn !== 'player') return;

        const result = this.gameState.playerTurn(action);
        this.updateUI();
        this.logAction(action, result);

        if (result.targetDefeated) {
            this.endGame('player');
            return;
        }

        this.gameState.currentTurn = 'enemy';
        setTimeout(() => this.processEnemyTurn(), 1000);
    }

    processEnemyTurn() {
        const result = this.gameState.enemyTurn();
        this.updateUI();
        this.logAction('attack', result);

        if (result.targetDefeated) {
            this.endGame('enemy');
            return;
        }

        this.gameState.currentTurn = 'player';
    }

    updateUI() {
        // Update player UI
        document.getElementById('playerHealth').textContent = this.gameState.player.health;
        document.getElementById('playerHealthBar').style.width = 
            `${(this.gameState.player.health / this.gameState.player.maxHealth) * 100}%`;

        // Update enemy UI
        document.getElementById('enemyHealth').textContent = this.gameState.enemy.health;
        document.getElementById('enemyHealthBar').style.width = 
            `${(this.gameState.enemy.health / this.gameState.enemy.maxHealth) * 100}%`;
    }

    logAction(action, result) {
        const log = document.getElementById('battleLog');
        let message = '';

        if (action === 'attack' && result.result) {
            message = `${result.result.attacker} attacks for ${result.result.damage} damage!`;
        } else if (action === 'heal') {
            message = `${this.gameState.player.name} heals for 20 health!`;
        }

        log.innerHTML += message + '<br>';
        log.scrollTop = log.scrollHeight;
    }

    endGame(winner) {
        this.gameState.isGameOver = true;
        this.logAction('', { 
            result: { 
                message: `Game Over! ${winner === 'player' ? 'Hero' : 'Dragon'} wins!` 
            }
        });
        document.querySelectorAll('button').forEach(btn => btn.disabled = true);
    }
}
// Initialize game when document loads
document.addEventListener('DOMContentLoaded', () => {
    // Create characters
    const hero = new Character("Hero", 100, 15, 5);
    const dragon = new Character("Dragon", 120, 12, 3);

    // Create game state
    const gameState = new GameState(hero, dragon);

    // Initialize UI
    const gameUI = new GameUI(gameState);

    // Initial UI update
    gameUI.updateUI();
});
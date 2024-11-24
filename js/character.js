class Character {
    constructor(name, health, attack, defense) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
        this.defense = defense;
        this.isAlive = true;
    }

    attackTarget(target) {
        const damage = Math.max(0, this.attack - target.defense);
        target.takeDamage(damage);
        return {
            attacker: this.name,
            target: target.name,
            damage: damage
        };
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        if (this.health === 0) {
            this.isAlive = false;
        }
    }

    heal(amount) {
        if (!this.isAlive) return;
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
}
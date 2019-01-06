export class Player
{
    name: string;
    seed: number;

    constructor (player)
    {
        this.name = player.name || '';
        this.seed = player.seed || -1;
    }

    static Bye(text = 'Bye')
    {
        return new this({ name: text });
    }

    isBye()
    {
        return this.seed < 0;
    }

    exists()
    {
        return this.seed <= 0;
    }
}
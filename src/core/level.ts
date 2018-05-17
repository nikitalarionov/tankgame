/**
 * Интерфейс объекта с данными карты для уровня
 */
interface mapData {
    data: number[][]
    name: string
}

interface GameObject {
    // TODO Implement
}

/**
 * Тестовый уровень - для разработки
 */
const testLevel1Map : mapData = {
    data: [
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,2,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1]
    ],
    name: 'developmentMap'
}

interface Level {

    /**
     * Игровые объекты в сцене
     */
    objects: GameObject[]

    render()

    update()

}

class Level implements Level {

    constructor() {
        
    }

    render() {

    }

    update() {

    }


}
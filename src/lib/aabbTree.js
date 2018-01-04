
/**
 * Бинарное дерево
 * Источник вдохновления
 * https://khan4019.github.io/front-end-Interview-Questions/bst.html
 */
class BinaryTree {

  /**
   * @param {Any} - добавить значение в дерево
   */
  push(val) {

    const root = this.root

    if (!root) {
      // Если нету вершины у дерева, создадим узел со значением
      this.root = new Node(val)
      return // Выходим из функции
    }

    // Получаем текущий узел дерева
    let currentNode = root
    // Создаем новый узел
    const newNode = new Node(val)

    // Пока, есть текущий узел
    while(currentNode) {
      // Если значение текущей вершины больше нового
      if (val < currentNode.value) {
        // Если нету левого узла
        if (!currentNode.left) {
          // Добавляем новое значение в левую ветку
          currentNode.left = newNode
          // Останавливаем цикл
          break
        } else {
          // если значение больше текущего
          // копируем левый узел в ссылку текущего узла
          currentNode = currentNode.left
        }
        // Если новое значение узла больше текущего
      } else {
        // Если нет правого узла
        if (!currentNode.right) {
          // Добавляем новый правый узел
          currentNode.right = newNode
          // Останавливаем цикл
          break
          // Если правый узел есть
        } else {
          // Копируем в переменную текущий узел
          // ссылку на правый
          currentNode = currentNode.right
        }
      }
    }
  }

  /**
   *  Поиск в ширину: Breadth First Search
   */
  bfs(root) {
    // Необходимо пройти все узлы в ширину

    // Если нет вершины у дерева
    // return

    // Очистить очередь
    // Добавить в очередь текущую вершину дерева

    // while очередь не пуста
      // узел = queue.remove()
      // print Node
      // if node.left != null
      //   добавить в очередь node.left
      // if node.right != null
      //   добавить в очередь node.right

    // Вопрос а что с этим дальше делать?
    // return значений из ф-ии в примере:
    // https://stackoverflow.com/questions/5262308/how-do-implement-a-breadth-first-traversal/13633354#13633354
    // не делается

    // Другой пример реализации:
    // https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/binarySearchTree.

  }

  /**
   * Поиск в глубину
   */
  bds() {

  }

}

/**
 * Класс узла дерева
 */
class Node {
  constructor(value) {
    this.left = null
    this.right = null
    this.value = value || null
  }

}

/**
 * Протестируем
 */

const btree = new BinaryTree()
btree.push(3)
btree.push(2)
btree.push(1)
console.log(btree)
console.log(btree.root.left)

/**
 * 1 - Добавили 3
 * 2 - Добавили 2 (2 < 3) - Добавить 2 в текуший левый узел
 * 3 - Добавили 1 (1 < 2) - Добавили 1 в левый узел (2)
 *
 * Текущее представление данных в бинарном дереве:
 * * - пустое значение
 *
 *        3
 *      2   *
 *    1       *
 *
 */

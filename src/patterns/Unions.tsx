import React from "react";

/**
 * Sometimes we know exactly all the variants of some data/entity we want to render.
 * In that case we can enumerate all such variants in a form of a discriminated union,
 * i.e. the union of types where each type has a "kind" property that can be used to narrow (discriminate) the type of union.
 *
 * This helps making render code more extensible and maintainable, i.e. using simple switch statements instead of complex nested if-else expressions.
 * While this does not "close" the component from modification, using techniques like switch+assertNever (see below) it makes code quite robust and easy to maintain.
 *
 * Іноді ми точно знаємо всі варіанти деяких даних/сутностей, які хочемо відрендерити.
 * У такому випадку ми можемо перелічити всі такі варіанти у формі discriminated union,
 * тобто об'єднання типів, де кожен тип має властивість "kind", яка може бути використана для звуження (дискримінації) типу об'єднання.
 *
 * Це допомагає робити код відтворення більш розширюваним та підтримуваним, тобто використовуючи прості оператори switch замість складних вкладених виразів if-else.
 * Хоча це не "закриває" компонент від модифікації, використання технік на кшталт switch+assertNever (див. нижче) робить код досить надійним і легким для підтримки.
 */

type TShirt = {
  kind: 'tshirt',
  color: string,
  size: number
}

type Phone = {
  kind: 'phone',
  memory: number
}

type Milk = {
  kind: 'milk',
  expiresAt: Date
}

type Product = TShirt | Phone | Milk


// a simple guard function that can be used to make sure we have checked all the possible kinds and did not forget any
// проста функція-гард, яку можна використовувати, щоб переконатися, що ми перевірили всі можливі види та не забули жодного
export function assertNever(x: never): never {
  throw new Error('cannot be never!')
}

export const RenderProduct = ({ product }: { product: Product }) => {
  // here we enumerate all the types of products and render each separately.
  // this pattern can also be used as an alternative to generics
  // тут ми перераховуємо всі типи продуктів та відображаємо кожен окремо.
  // цей патерн також можна використовувати як альтернативу Generics
  const renderProduct = () => {
    switch (product.kind) {
      // narrowing of type
      // звуження типу
      case 'tshirt':
        // notice that TS here knows the exact type of the product
        // on practice we usually use a dedicated component here accepting corresponding type as a prop
        // зверніть увагу, що TS тут знає точний тип продукту
        // на практиці ми зазвичай використовуємо тут спеціалізований компонент, який приймає відповідний тип як проп
        return <div>{product.color}</div>
      case 'phone':
        return <div>{product.memory}</div>
      case 'milk':
        return <div>{product.expiresAt.toISOString()}</div>
      default:
        // this is how we make sure that all the product kinds are checked above.
        // E.g. try and remove(comment out) one of the cases above, the TS compilier will give an error in the line below.
        // This can also help us in the future when we add one more type of products, that way we will not forget to update this render function.
        // ось як ми переконуємося, що всі види продуктів перевірені вище.
        // Наприклад, спробуйте видалити (закоментувати) один із кейсів вище, компілятор TS видасть помилку в наступному рядку.
        // Це також може допомогти нам у майбутньому, коли ми додамо ще один тип продуктів, таким чином ми не забудемо оновити цю функцію.
        return assertNever(product)
    }
  }
  return (
    <div>
      {renderProduct()}
    </div>
  )
}

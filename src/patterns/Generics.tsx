import React from "react";

/**
 * One of the most "advanced" ways to close the component from modification and open it for extensibility whyle keeping type safety is to use Generics.
 * That way we may reuse component with different types of children/props.
 * Note: if possible it is always better to use children (see Children.tsx). Generics are more commonly used with render props (see RenderProp.tsx)
 *
 * Один з найбільш "просунутих" способів закрити компонент від модифікацій та відкрити його для розширення, зберігаючи при цьому типову безпеку, - використовувати Generics.
 * Таким чином ми можемо повторно використовувати компонент з різними типами дочірніх елементів/пропсів.
 * Примітка: якщо можливо, завжди краще використовувати дочірні елементи (див. Children.tsx). Generics частіше використовуються з рендер-пропсами (див. RenderProp.tsx)
 */

interface Product {
  id: string,
  name: string,
  price: number
}

export const List = <T extends {},>({ items, renderItem }: { items: T[], renderItem: (p: T) => JSX.Element }) => {
  return (
    <div>
      {/** List usually envolves some state and extra logic, e.g. paging. Not showing it here for brevity. */}
      {/** Список зазвичай включає деякий стан та додаткову логіку, наприклад, пагінацію. Не показую це тут для стислості. */}
      {items.map(p => renderItem(p))}
    </div>
  )
}

interface Product {
  id: string,
  name: string,
  price: number,
}

export const App = ({ }) => {
  const products: Product[] = [] // TODO: get products from state

  return (
    <div>
      {/** Notice that type of p below is Product, i.e. we get type safety due to Generics */}
      {/** Зверніть увагу, що тип p нижче — Product, тобто ми отримуємо типову безпеку завдяки Generics */}
      <List items={products} renderItem={p => <>{p.name}</>} />
    </div>
  )
}

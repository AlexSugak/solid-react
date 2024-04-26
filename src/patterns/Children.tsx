import React from "react";

/**
 * Such components usually mix some wrapper logic/layout and children logic/layout.
 * This is not a problem per se, but makes such components less reusable.
 * E.g. what if we want to use the same wrapper but different children, or vise-versa?
 * On practice this leads over time to more conditional logic in the component body, which means harder to maintain code.
 *
 * Такі компоненти зазвичай поєднують логіку/розмітку обгортки та логіку/розмітку дочірніх елементів.
 * Це саме по собі не є проблемою, але робить такі компоненти менш універсальними.
 * Наприклад, що якщо ми хочемо використати ту саму обгортку, але інші дочірні елементи, або навпаки?
 * На практиці це з часом призводить до збільшення умовної логіки в тілі компоненту, що означає код, важчий для підтримки.
 */
export const ComplexComponent = ({ wrapperProp, childrenProp }: { wrapperProp: string, childrenProp: string }) => {
  return (
    <div className={wrapperProp}>
      <div className={childrenProp}></div>
    </div>
  )
}

/**
 * Instead, we can accept children as a prop.
 * This is the most native and supported way of doing components composition in React.
 * Unfortunately, it means a little bit more thought and code to begin with.
 * But it pays in a future, making code more maintainable and reusable.
 *
 * Натомість ми можемо приймати дочірні елементи як проп.
 * Це найбільш природний та підтримуваний спосіб композиції компонентів у React.
 * На жаль, це означає, що спочатку потрібно трохи більше роздумів та коду.
 * Але це окупається у майбутньому, роблячи код більш підтримуваним та універсальним.
 */
export const SimplerExtensibleComponent = ({ wrapperProp, children }: React.PropsWithChildren<{ wrapperProp: string }>) => {
  return (
    <div className={wrapperProp}>
      {children}
    </div>
  )
}

export const App = ({ }) => (
  <>
    {/** Concrete component, less code on the surface but harder to change and maintain in future. */}
    {/** Конкретний компонент, менше коду на поверхні, але важче змінювати та підтримувати у майбутньому. */}
    <ComplexComponent wrapperProp="wrapper" childrenProp="child" />
    {/** Desired behavior composed on a fly. Easier to understand, change and maintain in future. */}
    {/** Бажана поведінка, скомпонована на льоту. Легше зрозуміти, змінити та підтримувати у майбутньому. */}
    <SimplerExtensibleComponent wrapperProp="wrapper">
      <div className={"child"}></div>
    </SimplerExtensibleComponent>
  </>
)

import React from "react";

/**
 * To make component more reusable (OCP) we often need to be able to customize the part of its logic/layout.
 * If possible we should always use children (see Children.tsx) to do this.
 * Sometimes though, the reusable component can have state which we need to have access to when rendering the customized part (e.g. children).
 * Another scenario is when the "slot" of the component we want to customize cannot be logically represented as its children,
 * or component has a number of such slots (there could only be one children).
 *
 * In such scenarios we can use a render prop.
 *
 * Щоб зробити компонент більш універсальним (OCP), нам часто потрібно мати можливість кастомізувати частину його логіки/розмітки.
 * Якщо можливо, ми завжди повинні використовувати дочірні елементи (див. Children.tsx) для цього.
 * Однак іноді універсальний компонент може мати стан, до якого нам потрібен доступ під час рендерингу кастомної частини (наприклад, дочірніх елементів).
 * Інший сценарій — коли "слот" компонента, який ми хочемо змінити, не може бути логічно представлений як його дочірні елементи,
 * або коли компонент має кілька таких слотів (дочірній елемент може бути лише один).
 *
 * У таких сценаріях ми можемо використовувати рендер-проп.
 */

export const DigitalTime = ({ time }: { time: Date }) => {
  // A naive implementation just to showcase the pattern
  // Наївна реалізація, лише для демонстрації патерну
  const hours = time.getHours()
  const minutes = time.getMinutes()

  return <>{`${hours}:${minutes}`}</>
}

export const Clock = ({ renderTime }: { renderTime: (time: Date) => JSX.Element }) => {
  const [time, setTime] = React.useState(new Date())
  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  })

  return (
    <div>
      {renderTime(time)}
    </div>
  )
}

export const App = ({ }) => {
  /**
   * Notice that we cannot use children here as we need to have acceess to time coming from parent component.
   * Another alternative is to use React Context to pass the time from parent to children, but this makes code more brittle
   * as such data dependencies are not visible in types
   *
   * Зверніть увагу, що ми не можемо використовувати тут дочірні елементи, оскільки нам потрібен доступ до часу, який надходить від батьківського компоненту.
   * Інша альтернатива — використання React Context для передачі часу від батьківського компоненту до дочірніх, але це робить код більш крихким,
   * оскільки такі залежності даних не видно в типах
   */
  return (
    <Clock renderTime={t => <DigitalTime time={t} />} />
  )
}

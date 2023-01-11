import { ComponentPropsWithoutRef, Fragment, ReactElement } from 'react'
import { Listbox } from '@headlessui/react'
import './external.scss'
import { ReactComponent as ArrowDownIcon } from '../../icons/chevron-down.svg'
import classNames from 'classnames'

export interface InfSelectExternalProps extends ComponentPropsWithoutRef<'div'> {
  items: any[]
  selected: Record<string, any>
  onChange: (value: Record<string, any>) => void
  disabled?: boolean
  placeholder?: string
}

// TODO: Компонент обертка
// const InfSelectExternal = ({
//   items,
//   selected,
//   onChange,
//   placeholder = 'Не указано',
//   disabled = false,
//   children,
//   ...props
// }: InfSelectExternalProps): ReactElement => {
//   const buttonClassNames = classNames(
//     'inf-select-external__button',
//     {
//       'inf-select-external__button--selected': selected?.name,
//       'inf-select-external__button--disabled': disabled
//     }
//   )
//
//   return (
//     <div className={'inf-select-external'} {...props}>
//       <Listbox
//         disabled={disabled}
//         onChange={onChange}
//         value={selected}>
//         {children}
//         <Listbox.Button className={buttonClassNames}>
//           {selected?.name || placeholder}
//           <span className={'inf-select-external__arrow'}>
//             <ArrowDownIcon width={'10px'} height={'5px'} />
//           </span>
//         </Listbox.Button>
//         <Listbox.Options className={'inf-select-external__options'}>
//           {items.map((item) => (
//             <Listbox.Option
//               as={Fragment}
//               value={item}
//               key={item.id}
//               disabled={item.disabled}>
//               {({ active }) => (
//                 <li
//                   className={classNames('inf-select-external__option', { 'inf-select-external__option--active': active })}>
//                   {item.name}
//                 </li>
//               )}
//             </Listbox.Option>
//           ))}
//         </Listbox.Options>
//       </Listbox>
//     </div>
//   )
// }

const Box = ({ as = 'div', children, ...props }: any): ReactElement => {
  // TODO: тут теряется контекст
  // Тут можно создавать новый контекст и подписываться на него, но зачем еще 1 контекст. Лучше тогда уж компонент обертку
  console.log(props)
  return (
    <Listbox as={as} {...props}>
      {children}
    </Listbox>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Box.displayName = 'InfSelectExternal.Box'
}
const Button = ({ children, ...props }: any): JSX.Element => {
  // TODO: Как тут узнать, какой элемент выбран????
  return (
    <Listbox.Button className={classNames('inf-select-external__button')} {...props}>
      {children}
      <span className={'inf-select-external__arrow'}>
        <ArrowDownIcon width={'10px'} height={'5px'} />
      </span>
    </Listbox.Button>
  )
}
if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'InfSelectExternal.Button'
}

const Options = ({ children, ...props }: any): ReactElement => {
  return <Listbox.Options className={'inf-select-external__options'} {...props}>{children}</Listbox.Options>
}
if (process.env.NODE_ENV !== 'production') {
  Options.displayName = 'InfSelectExternal.Options'
}

const Option = ({ children, ...props }: any): ReactElement => {
  return (
    <Listbox.Option
      as={Fragment}
      className={'inf-select-external__option'}
      {...props}>
      {({ active }) => (
        <li
          className={classNames('inf-select-external__option', { 'inf-select-external__option--active': active })}>
          {children}
        </li>
      )}
    </Listbox.Option>
  )
}
if (process.env.NODE_ENV !== 'production') {
  Option.displayName = 'InfSelectExternal.Option'
}
// InfSelectExternal.Button = Button

export default Object.assign(Box, { Button, Options, Option })

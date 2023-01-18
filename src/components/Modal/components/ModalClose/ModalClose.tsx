import './ModalClose.scss'

interface ModalCloseProps {
  onClick: () => void
}

const ModalClose = ({ onClick }: ModalCloseProps): JSX.Element => {
  return (
    <button className="inf-modal-close" onClick={onClick}>
      <svg
        className="inf-modal-close__icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default ModalClose

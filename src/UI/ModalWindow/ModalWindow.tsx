import style from "./style.module.scss";

type ModalType = { showModal: boolean; children: JSX.Element; action: (arg: boolean) => void };

const ModalWindow = ({ showModal, children, action }: ModalType) => {
  if (!showModal) return null;

  return (
    <div className={style.modal_wrapper} onClick={() => action(false)}>
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;


import { Modal } from "./Modal";
const ConfirmModal =({setShow,onConfirm})=>{
    return <Modal title="Confirm" visible={true} setVisible={setShow} onSave={ () => onConfirm() }>
        Confirm Action
    </Modal>
}
export {ConfirmModal};
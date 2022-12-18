import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Backdrop = (props) =>{
    return(
        <div className={styles.backdrop} onClick={props.onClick}></div>
    )
}; 


const ModalOverLay = (props) =>{
    return(
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}


const portalElement = document.getElementById('overlays');

function Modal(props) {


    return(
        <>

            {ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, portalElement)}
            
                  

            {/* if not using portals */}

            {/* <Backdrop />

            <ModalOverLay>
                {props.children}
            </ModalOverLay> */}
        </>
    )
    
}; 

export default Modal;
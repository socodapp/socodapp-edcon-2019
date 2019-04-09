import React from 'react'
import Modal from '@material-ui/core/Modal'

const styles = {

}
const ProviderAlert = () => {

  return (
    <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={this.state.open}
    onClose={this.handleClose}
    className={styles}
  >
  WARNING: Please check your Metamask Provider, or check that you have MetaMask installed.
  </Modal>
  )
}

export default ProviderAlert
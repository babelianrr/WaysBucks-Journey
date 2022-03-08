import { Modal, Button } from 'react-bootstrap'

export default function CompleteOrder({ show, handleClose, setCompleteOrder }) {

  const handleComplete = () => {
    setCompleteOrder(true)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="fs-24 fw-9">
          Delete Data
        </div>
        <div className="fs-16 fw-5 mt-2">
          Are you sure you want to complete the order?
        </div>
        <div className="text-end mt-5">
          <Button onClick={handleComplete} size="sm" className="btn-success me-2" style={{ width: '135px' }}>Yes</Button>
          <Button onClick={handleClose} size="sm" className="btn-danger" style={{ width: '135px' }}>No</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

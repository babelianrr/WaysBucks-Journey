import { Modal, Button } from 'react-bootstrap'

export default function DeclineOrder({ showDecline, handleCloseDecline, setDeclineOrder }) {

  const handleDecline = () => {
    setDeclineOrder(true)
  }

  return (
    <Modal show={showDecline} onHide={handleCloseDecline} centered>
      <Modal.Body>
        <div className="fs-24 fw-9">
          Decline Order
        </div>
        <div className="fs-16 fw-5 mt-2">
          Are you sure you want to decline the order?
        </div>
        <div className="text-end mt-5">
          <Button onClick={handleDecline} size="sm" className="btn-success me-2" style={{ width: '135px' }}>Yes</Button>
          <Button onClick={handleCloseDecline} size="sm" className="btn-danger" style={{ width: '135px' }}>No</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

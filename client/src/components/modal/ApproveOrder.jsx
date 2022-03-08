import { Modal, Button } from 'react-bootstrap'

export default function ApproveOrder({ showApprove, handleCloseApprove, setApproveOrder }) {

  const handleApprove = () => {
    setApproveOrder(true)
  }

  return (
    <Modal show={showApprove} onHide={handleCloseApprove} centered>
      <Modal.Body>
        <div className="fs-24 fw-9">
          Delete Data
        </div>
        <div className="fs-16 fw-5 mt-2">
          Are you sure you want to approve the order?
        </div>
        <div className="text-end mt-5">
          <Button onClick={handleApprove} size="sm" className="btn-success me-2" style={{ width: '135px' }}>Yes</Button>
          <Button onClick={handleCloseApprove} size="sm" className="btn-danger" style={{ width: '135px' }}>No</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

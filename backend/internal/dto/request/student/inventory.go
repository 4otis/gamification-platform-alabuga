package student

type EquipItemRequest struct {
	ItemID uint `json:"item_id" binding:"required"`
	TypeID uint `json:"type_id" binding:"required"`
}

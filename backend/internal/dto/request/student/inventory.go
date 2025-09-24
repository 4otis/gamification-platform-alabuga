package student

type EquipItemRequest struct {
	StudentID uint `json:"id"`
	ItemID    uint `json:"item_id"`
	TypeID    uint `json:"type_id"` // TODO: переделать под name
}

package student

// InventoryResponse структура ответа страницы гардероба
// swagger:model InventoryResponse
type InventoryResponse struct {
	Profile   *ProfileInfo    `json:"profile"`
	Items     []*ItemInfo     `json:"items"`
	ItemTypes []*ItemTypeInfo `json:"item_types"`
}

// EquipItemResponse структура ответа на обновление состояние вещи
// swagger:model EquipItemResponse
type EquipItemResponse struct {
	EquipedItems []*ItemInfo `json:"items"`
}

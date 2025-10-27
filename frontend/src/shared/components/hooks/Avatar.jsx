export default function Avatar({items, types}){
  return(
    <div className="avatarrrr" style={{width:"200px", height:"200px"}}>
      {items.map((item, index) => (
        <img  
          key={index}
          src={"http://localhost:8080/static" + item.file_path}
          style={{
            width:"200px",
            height:"200px",
            objectFit: "cover",
            position: "absolute",
            objectFit: "cover",
            zIndex: types.find(t => t.name === item.type_name)?.id || 0
          }}
        />
      ))}
    </div>
  )
};

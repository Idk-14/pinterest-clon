const Cards = ({item}) => {
    return ( 

        <div key={item.id} className="item">

          <div className="image">
            <img  src={item.urls.small} alt={item.description}></img>
            <a className="btn-save" href="">Guardar</a>
            <a className="icon-upload" href=""><img src="/uploadicon.png" alt="updload"></img></a>
            <a className="icon-dots" href=""><img src="/dotsicon.png" alt="updload"></img></a>
          </div>

          <p>{item.description}</p>

          <div>
            <img className="user" src={item.user.profile_image.small} alt={item.user.name} />
            <span>{item.user.name}</span>
          </div>          

        </div>
     );
}
 
export default Cards;
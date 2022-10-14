import Header from './Header';
import Footer from './Footer';
import '../styles/tabs.css';

const PlaydatesTabs = () => {

    // const tabs = document.querySelector(".wrapper");
// const tabButton = document.querySelectorAll(".tab-button");
// const contents = document.querySelectorAll(".content");

// tabs.onclick = e => {
//   const id = e.target.dataset.id;
//   if (id) {
//     tabButton.forEach(btn => {
//       btn.classList.remove("active");
//     });
//     e.target.classList.add("active");

//     contents.forEach(content => {
//       content.classList.remove("active");
//     });
//     const element = document.getElementById(id);
//     element.classList.add("active");
//   }
// }

    const handleClick = (e) => {
        // removing active class from all tabs button

    }

    return (
        <div className="wrapper">
            <Header />
            <div className="buttonWrapper">
                <button className="tab-button active" style={{borderTopLeftRadius: '10px', dataId:'home'}} onClick={handleClick}>Home</button>
                <button className="tab-button" data-id="about" onClick={handleClick}>About</button>
                <button className="tab-button" style={{borderTopLeftRadius: '10px', dataId:'contact'}}  onClick={handleClick}>Contact</button>
            </div>
            <div className="contentWrapper">
                <p className="tab-content active" id="home">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iste doloribus unde ullam doloremque eos autem ad nulla accusamus? Modi at minima numquam accusamus repudiandae perspiciatis nostrum architecto voluptatem quasi?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ratione corporis earum laudantium sapiente autem praesentium error neque illum adipisci modi ea, consectetur rerum pariatur laborum aperiam at commodi! Impedit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quasi porro dolorum deleniti velit fuga perspiciatis veniam minus perferendis facere sit doloribus aliquid illum adipisci. Quam quasi maxime perferendis dolorem.
                </p>
                <p className="tab-content" id="about">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis maxime itaque veritatis iste soluta placeat obcaecati laudantium repellat corrupti! Eius sunt rerum inventore magnam? Perspiciatis facere error suscipit quisquam quibusdam.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam, corporis voluptatem quo dignissimos eius quis perferendis vero culpa reiciendis nulla quisquam fugit minima sed molestiae excepturi beatae repudiandae ea? Aliquid!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim sapiente officia vel consequuntur, hic at quis? Illo repellendus dolores totam facilis sunt sequi qui hic, nulla ratione harum porro perspiciatis.
                </p>
                <p className="tab-content" id="contact">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sit incidunt nostrum? Magni, quam vero, magnam odio similique ipsam minima et repellat rerum cupiditate totam in repudiandae. Sed, dicta corrupti?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dolore quas quis earum incidunt voluptas! Ducimus quod libero aliquid consequatur et modi porro officia, quibusdam quas commodi placeat maxime qui?
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab ea debitis eligendi accusamus deleniti maxime pariatur. Assumenda, facere placeat eius quam magni accusantium aut quae minima iure atque incidunt illum.
                </p>
            </div>
            <Footer/>
        </div>
    )
}

export default PlaydatesTabs
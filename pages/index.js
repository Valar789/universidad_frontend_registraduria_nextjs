import TopNavLogin from "components/Layout/TopNavLogin";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <TopNavLogin />
      <div className="container-fluid p-0">
        <div
          id="carouselMaterialStyle"
          className="carousel slide carousel-fade w-100 h-90"
          data-mdb-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-mdb-target="#carouselMaterialStyle"
              data-mdb-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselMaterialStyle"
              data-mdb-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselMaterialStyle"
              data-mdb-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <Link href='/candidatos'>
              <img
                src="https://conexioncapital.co/wp-content/uploads/2018/03/costo-votaciones.jpg"
                className="d-block w-100 vh-100"
                alt="Sunset Over the City"
              />
              </Link>
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
              </div>
            </div>
            <Link href='/candidatos'>
            <div className="carousel-item">
              <img
                src="https://i.postimg.cc/BbRBQ7R6/reg2.jpg"
                className="d-block w-100 vh-100"
                alt="Canyon at Nigh"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
              </div>
            </div>
            </Link>
            <Link href='/candidatos'>
            <div className="carousel-item">
              <img
                src="https://i.postimg.cc/2y1xYNcM/reg1.jpg"
                className="d-block w-100 vh-100"
                alt="Cliff Above a Stormy Sea"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
              </div>
            </div>
            </Link>
          </div>
        

          <button
            className="carousel-control-prev"
            type="button"
            data-mdb-target="#carouselMaterialStyle"
            data-mdb-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-mdb-target="#carouselMaterialStyle"
            data-mdb-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

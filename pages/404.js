import Image from 'next/image';
import Link from 'next/link';
import img404 from 'public/assets/img/error-404-monochrome.svg'

export default function custom404() {
  return (
    <div className="container-fluid ">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="text-center">
            <Image src={img404} className="img-error " width={300}
        height={500} alt='404' />
            <p className="lead">La pagina que solicita no existe</p>
            <Link href="/mesas">
            <a >
              <i className="fas fa-arrow-left me-1"></i>
              Volver al Dashboard
            </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

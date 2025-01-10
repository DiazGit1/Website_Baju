import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-400">Tentang Kami</h2>
            <p className="text-gray-400 mb-4">
              Kami adalah perusahaan yang bergerak di bidang sablon dan desain kaos. Kami memiliki pengalaman lebih dari 10 tahun dalam melayani pelanggan dengan kualitas terbaik.
            </p>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400">
                <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400">
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400">
                <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400">
                <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Information Links Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-400">Informasi</h2>
            <ul>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-orange-400">FAQ</Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-400 hover:text-orange-400">Feedback</Link>
              </li>
              <li>
                <Link to="/kontak" className="text-gray-400 hover:text-orange-400">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-400">Kontak</h2>
            <ul className="text-gray-400">
              <li className="mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />{' '}
                <a href="mailto:example@example.com" className="hover:text-orange-400">example@example.com</a>
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faPhone} className="mr-2" /> 08123456789
              </li>
              <li className="mb-2">
                Jl. Example, No. 123, Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400">&copy; 2024 T-Shirt Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

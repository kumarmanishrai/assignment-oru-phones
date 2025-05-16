const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <p className="text-gray-600 text-sm text-center">
            © {currentYear} ORU Phones |{" "}
            <a href="/privacy" className="hover:text-blue-600 transition-colors duration-200">Privacy</a> |{" "}
            <a href="/terms" className="hover:text-blue-600 transition-colors duration-200">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

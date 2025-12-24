import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Star,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

// Sample product data
const products = [
  {
    id: 1,
    name: "Gold Necklace Set",
    price: 45000,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Diamond Ring",
    price: 85000,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Gold Bangles",
    price: 35000,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Pearl Earrings",
    price: 25000,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Gold Chain",
    price: 55000,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Bridal Set",
    price: 125000,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    text: "Absolutely love my bridal jewelry from Dwarika! The craftsmanship is exquisite.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    text: "Best gold shop in town. Authentic products and great customer service.",
    rating: 5,
  },
  {
    name: "Anita Rai",
    text: "Bought a beautiful necklace set for my daughter's wedding. Highly recommend!",
    rating: 5,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState(""); // Committed search term
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Commit the temporary query to trigger search
  const commitSearch = () => {
    setSearchQuery(tempQuery);
    if (tempQuery.trim() !== "") {
      setCurrentPage("search");
    } else {
      setCurrentPage("home");
    }
  };

  // const handleSearchChange = (value) => {
  //   setSearchQuery(value);
  //   if (value.trim() !== "") {
  //     setCurrentPage("search");
  //   } else {
  //     setCurrentPage("home");
  //   }
  // };

  const topRatedProducts = products.filter((p) => p.rating === 5).slice(0, 3);

  const getFilteredProducts = () => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const Navbar = () => {
    // Local search state INSIDE Navbar - this fixes everything!
    const [localTempQuery, setLocalTempQuery] = useState("");

    const localCommitSearch = () => {
      setSearchQuery(localTempQuery);
      if (localTempQuery.trim() !== "") {
        setCurrentPage("search");
      } else {
        setCurrentPage("home");
      }
    };

    return (
      <nav
        className={`sticky top-0 z-50 ${
          darkMode ? "bg-gray-900" : "bg-white"
        } shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.png"
                alt="Dwarika Logo"
                className="w-20 h-20 object-contain"
              />
              <span
                className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent`}
              >
                Dwarika
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentPage("home")}
                className={`${
                  currentPage === "home"
                    ? "text-purple-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-purple-600 font-medium`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("about")}
                className={`${
                  currentPage === "about"
                    ? "text-purple-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-purple-600 font-medium`}
              >
                About
              </button>
              <button
                onClick={() => setCurrentPage("contact")}
                className={`${
                  currentPage === "contact"
                    ? "text-purple-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-purple-600 font-medium`}
              >
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar - NOW FULLY WORKING */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={localTempQuery}
                  onChange={(e) => setLocalTempQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      localCommitSearch();
                    }
                  }}
                  className={`pl-10 pr-12 py-2 rounded-full w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-800 text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"
                  }`}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                <button
                  onClick={localCommitSearch}
                  className={`absolute right-3 top-2.5 rounded-full transition-all duration-200 ${
                    localTempQuery.trim()
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg"
                      : darkMode
                      ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      : "bg-gray-300 text-gray-500 hover:bg-gray-400"
                  }`}
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                } hover:bg-purple-100 dark:hover:bg-gray-700`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? (
                  <X className={darkMode ? "text-white" : "text-gray-900"} />
                ) : (
                  <Menu className={darkMode ? "text-white" : "text-gray-900"} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setCurrentPage("home");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${
                    currentPage === "home"
                      ? "text-purple-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  } hover:text-purple-600`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("about");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${
                    currentPage === "about"
                      ? "text-purple-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  } hover:text-purple-600`}
                >
                  About
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("contact");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${
                    currentPage === "contact"
                      ? "text-purple-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  } hover:text-purple-600`}
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  const Hero = () => (
    <div
      className={`relative ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-purple-50 via-white to-purple-50"
      } py-20 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Dwarika
            </span>
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Timeless Elegance in Every Piece
          </p>
          <p
            className={`text-lg mb-10 max-w-2xl mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Discover our exquisite collection of handcrafted gold jewelry,
            designed to make every moment special
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Explore Collection
          </button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
    </div>
  );

  const TopRatedProducts = () => {
    return (
      <div className={`py-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-4xl font-bold text-center mb-12 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Top Rated Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRatedProducts.map((product) => (
              <div
                key={product.id}
                className={`${
                  darkMode ? "bg-gray-900" : "bg-white"
                } rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 ${
                  darkMode ? "border-gray-700" : "border-purple-100"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Testimonials = () => (
    <div className={`py-16 ${darkMode ? "bg-gray-900" : "bg-purple-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } p-8 rounded-xl shadow-lg`}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p
                className={`mb-4 italic ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                "{testimonial.text}"
              </p>
              <p
                className={`font-bold ${
                  darkMode ? "text-purple-400" : "text-purple-600"
                }`}
              >
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer
      className={`${
        darkMode ? "bg-gray-900" : "bg-purple-900"
      } text-white py-12`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-yellow-400 text-3xl font-bold">D</span>
              </div>
              <h3 className="text-3xl font-bold text-yellow-400">Dwarika</h3>
            </div>
            <p className="text-gray-300">
              Your trusted partner for exquisite gold jewelry since 1990.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("about")}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("contact")}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Products
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Necklaces
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Rings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Bangles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Earrings
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">+977 1234567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">info@dwarika.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Patan, Nepal</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Dwarika Gold Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const AboutPage = () => (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1
          className={`text-5xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          About Dwarika
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop"
              alt="Jewelry"
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div>
            <h2
              className={`text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800`}
            >
              Our Story
            </h2>
            <p
              className={`text-lg mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Established in 1990, Dwarika has been serving the community with
              authentic and exquisite gold jewelry for over three decades. Our
              commitment to quality and craftsmanship has made us one of the
              most trusted names in the industry.
            </p>
            <p
              className={`text-lg mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Every piece of jewelry at Dwarika is crafted with precision and
              passion by our skilled artisans. We blend traditional
              craftsmanship with modern designs to create timeless pieces that
              celebrate your special moments.
            </p>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              From bridal collections to everyday elegance, we offer a wide
              range of jewelry that caters to every taste and occasion. Visit us
              and experience the Dwarika difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1
          className={`text-5xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2
              className={`text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800`}
            >
              Get In Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Phone
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    +977 1234567890
                  </p>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    +977 0987654321
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Email
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    info@dwarika.com
                  </p>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    support@dwarika.com
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Address
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Main Street, Patan
                  </p>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Bagmati Province, Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-purple-50"
            } p-8 rounded-xl`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Send us a message
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full p-3 rounded-lg ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white"
                } border ${
                  darkMode ? "border-gray-700" : "border-purple-200"
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full p-3 rounded-lg ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white"
                } border ${
                  darkMode ? "border-gray-700" : "border-purple-200"
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className={`w-full p-3 rounded-lg ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white"
                } border ${
                  darkMode ? "border-gray-700" : "border-purple-200"
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className={`w-full p-3 rounded-lg ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white"
                } border ${
                  darkMode ? "border-gray-700" : "border-purple-200"
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
              ></textarea>
              <button
                onClick={() => alert("Message sent successfully!")}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SearchResultsPage = () => {
    const searchResults = getFilteredProducts();

    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1
            className={`text-5xl font-bold text-center mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Search Results
          </h1>
          <p
            className={`text-xl text-center mb-12 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Showing results for "{searchQuery}"
          </p>

          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p
                className={`text-2xl mb-4 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No products found matching "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage("home");
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 ${
                    darkMode ? "border-gray-700" : "border-purple-100"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <Navbar />
      {currentPage === "home" && (
        <>
          <Hero />
          <TopRatedProducts />
          <Testimonials />
        </>
      )}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "search" && <SearchResultsPage />}
      <Footer />
    </div>
  );
}

export default App;

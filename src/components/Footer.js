import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">🎬 Market Station</h2>
              <p className="text-gray-400">Professional presets for creators</p>
            </div>
            <div className="flex space-x-6">
              <a href="#!" className="hover:text-primary-400 transition">
                Terms
              </a>
              <a href="#!" className="hover:text-primary-400 transition">
                Privacy
              </a>
              <a href="#!" className="hover:text-primary-400 transition">
                Contact
              </a>
            </div>
          </div>
          <div className="text-center text-gray-400 mt-8 text-sm">
            &copy; {new Date().getFullYear()} Market Station. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

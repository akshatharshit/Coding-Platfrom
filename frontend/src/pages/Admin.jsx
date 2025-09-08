import React, { useState } from 'react';
import { Plus, Edit, Trash2, Video } from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem to the platform',
      icon: Plus,
      color: 'btn-success',
      bgColor: 'bg-success/20',
      route: '/admin/create',
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Edit existing problems and their details',
      icon: Edit,
      color: 'btn-warning',
      bgColor: 'bg-warning/20',
      route: '/admin/update',
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Remove problems from the platform',
      icon: Trash2,
      color: 'btn-error',
      bgColor: 'bg-error/20',
      route: '/admin/delete',
    },
    {
      id: 'video',
      title: 'Video Problem',
      description: 'Upload And Delete Videos',
      icon: Video,
      color: 'btn-success',
      bgColor: 'bg-success/20',
      route: '/admin/video',
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-extrabold text-base-content mb-3">
            Admin Panel
          </h1>
          <p className="text-base-content/70 text-lg max-w-xl mx-auto">
            Manage coding problems on your platform
          </p>
        </div>

        {/* Admin Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="card bg-base-100 shadow-lg rounded-xl transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-primary/60 overflow-hidden animate-fadeInUp"
                onClick={() => setSelectedOption(option.id)}
                aria-selected={selectedOption === option.id ? 'true' : 'false'}
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') window.location.href = option.route; }}
              >
                <div className="card-body items-center text-center p-8">
                  {/* Icon with bounce animation on hover */}
                  <div
                    className={`${option.bgColor} p-5 rounded-full flex items-center justify-center mb-5
                      transition-transform duration-500 hover:animate-bounce`}
                    aria-hidden="true"
                  >
                    <IconComponent size={36} className="text-base-content" />
                  </div>

                  {/* Title */}
                  <h2 className="card-title text-2xl font-semibold mb-3">
                    {option.title}
                  </h2>

                  {/* Description */}
                  <p className="text-base-content/60 mb-8 max-w-[280px]">
                    {option.description}
                  </p>

                  {/* Action Button with pulse and scale on hover */}
                  <NavLink
                    to={option.route}
                    className={`btn ${option.color} btn-wide text-base font-semibold focus:outline-none 
                      focus:ring-4 focus:ring-offset-2 focus:ring-${option.color.replace('btn-', '')} 
                      transition-transform duration-300 hover:scale-105 hover:animate-pulse`}
                    tabIndex={0}
                  >
                    {option.title}
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animations CSS (can be in your global CSS or Tailwind config) */}
      <style jsx>{`
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes fadeInUp {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Admin;

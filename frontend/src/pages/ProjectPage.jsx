import { useEffect } from "react";
import axiosClient from "../axiosClient";
import MaterialReactTable from "material-react-table";

const ProjectPage = () => {

  const colums = [
    {
      header: "Название",
      accessorKey: "name",
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      header: "Последнее добавление",
      accessorKey: "LastCommit",
      enableSorting: false,
      enableColumnFilter: false
    }
  ];

  const data = [
    {
      name: "dsdsd",
      LastCommit: "3 days",
    },
    {
      name: "dsddsadssd",
      LastCommit: "3 days",
    },
    {
      name: "trettert",
      LastCommit: "1 year",
    },
    {
      name: "dsdiuyiuysd",
      LastCommit: "today",
    },
    {
      name: "iuyiuy",
      LastCommit: "100 days",
    }

  ]

  return (
    <div className="project">
      <div className="project__container">

        <div className="project__inner">
          <div className="project__info">
            <div className="project__info-inner">
              <h1>_Название проекта</h1>
              <div className="project__info-public">

                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10.5" cy="5.25" r="3.5" stroke="white" stroke-opacity="0.6" />
                  <path d="M15.75 7.875C17.1997 7.875 18.375 6.89562 18.375 5.6875C18.375 4.47938 17.1997 3.5 15.75 3.5" stroke="white" stroke-opacity="0.6" stroke-linecap="round" />
                  <path d="M5.25 7.875C3.80025 7.875 2.625 6.89562 2.625 5.6875C2.625 4.47938 3.80025 3.5 5.25 3.5" stroke="white" stroke-opacity="0.6" stroke-linecap="round" />
                  <ellipse cx="10.5" cy="14.875" rx="5.25" ry="3.5" stroke="white" stroke-opacity="0.6" />
                  <path d="M17.5 16.625C19.035 16.2884 20.125 15.4359 20.125 14.4375C20.125 13.4391 19.035 12.5866 17.5 12.25" stroke="white" stroke-opacity="0.6" stroke-linecap="round" />
                  <path d="M3.5 16.625C1.96503 16.2884 0.875 15.4359 0.875 14.4375C0.875 13.4391 1.96503 12.5866 3.5 12.25" stroke="white" stroke-opacity="0.6" stroke-linecap="round" />
                </svg>

                <span>Публичный</span>
              </div>
            </div>
            <button className="sidebar_btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_101_5259)">
                  <path d="M9.57207 2.71912L10.19 2.1012C11.2138 1.07739 12.8737 1.07739 13.8975 2.1012C14.9213 3.125 14.9213 4.78491 13.8975 5.80871L13.2796 6.42663M9.57207 2.71912C9.57207 2.71912 9.64931 4.03219 10.8079 5.19079C11.9665 6.34939 13.2796 6.42663 13.2796 6.42663M9.57207 2.71912L3.89125 8.39994C3.50647 8.78472 3.31408 8.9771 3.14863 9.18923C2.95345 9.43946 2.78612 9.71022 2.64959 9.99669C2.53385 10.2395 2.44782 10.4977 2.27574 11.0139L1.54657 13.2014M13.2796 6.42663L7.59877 12.1075C7.21399 12.4922 7.0216 12.6846 6.80947 12.8501C6.55924 13.0453 6.28849 13.2126 6.00202 13.3491C5.75916 13.4649 5.50105 13.5509 4.98482 13.723L2.79731 14.4521M2.79731 14.4521L2.26259 14.6304C2.00855 14.7151 1.72847 14.6489 1.53912 14.4596C1.34977 14.2702 1.28365 13.9902 1.36833 13.7361L1.54657 13.2014M2.79731 14.4521L1.54657 13.2014" stroke="white" />
                </g>
                <defs>
                  <clipPath id="clip0_101_5259">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          <div className="project_description">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam
          </div>

          <div className="project__last-info">
            <div>&gt; John Johnoson, Администрация, 28.06.2023</div>
            <div>// Язык: Python</div>
          </div>

          <div className="project__fileStructure">
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProjectPage;

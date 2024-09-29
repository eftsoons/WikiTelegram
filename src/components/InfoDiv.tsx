import { ReactNode, useState } from "react";
import Border from "./Border";
import { Chain, Champ, Course, Explore } from "../svg";

export default ({
  text,
  icon,
  children,
  setinfodiv,
  index,
}: {
  text: string;
  icon?: ReactNode;
  children: ReactNode;
  setinfodiv?: Function;
  index?: number;
}) => {
  const [settings, setsettings] = useState<boolean>(false);
  const [settngsicon, setsettngsicon] = useState<boolean>(false);

  const handleicon = (element: ReactNode) => {
    if (setinfodiv && (index || index == 0)) {
      setinfodiv(
        (
          infodiv: Array<{
            name: string;
            icon: ReactNode | null;
            content: Array<{
              before: string;
              header: string;
              text: string;
              nextclick: string;
            }>;
          }>
        ) => {
          const seticon = [...infodiv];

          seticon[index].icon = element;

          return seticon;
        }
      );
    }
  };

  return (
    <div className="info">
      <div className="info-headerinfo">
        <span>{text}</span>
        {icon ? (
          <div
            onClick={() => {
              setsettings(!settings);

              if (settngsicon) {
                setsettings(false);
                setsettngsicon(false);
              }
            }}
          >
            {icon}
          </div>
        ) : (
          <div
            onClick={() => {
              setsettings(!settings);

              if (settngsicon) {
                setsettings(false);
                setsettngsicon(false);
              }
            }}
          >
            <Course />
          </div>
        )}
        {setinfodiv && (index || index == 0) && (
          <>
            {settings && (
              <div className="settings-menu">
                <div className="settings-items">asd</div>
                <div className="settings-items">asd</div>
                <div className="settings-items">asd</div>
                <Border />
                <div className="settings-items">INFO</div>
                <div
                  className="settings-items"
                  onClick={() => {
                    setsettngsicon(true);
                    setsettings(false);
                  }}
                >
                  ICON
                </div>
                <Border />
                <div className="settings-items">SAVE</div>
              </div>
            )}
            {settngsicon && (
              <div className="settings-menu-icon">
                <Chain onClick={() => handleicon(<Chain />)} />
                <Champ onClick={() => handleicon(<Champ />)} />
                <Course onClick={() => handleicon(<Course />)} />
                <Explore onClick={() => handleicon(<Explore />)} />
              </div>
            )}
          </>
        )}
      </div>
      <div className="info-content">{children}</div>
    </div>
  );
};

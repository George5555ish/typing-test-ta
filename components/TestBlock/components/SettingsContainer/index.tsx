import React from "react";
import {
  USE_DEFAULT_GENERATED_TEXT,
  USE_USER_GENERATED_TEXT,
} from "../../../../constants";
import { SettingsContainerInterface } from "../../../../interfaces";
import styles from "../../../../styles/component-styles/SettingsContainer.module.css";
import TabButton from "../../fragments/TabButton";
import TimeOptionsButton from "../../fragments/TimeOptionsButton";
function SettingsContainer({
  isTimerRunning,
  isCurrentTabUserGenerated,
  customTimer,
  currentTimeInSeconds,
  isCustomTimerEnabled,
  isInputDisabled,
  handleSliderInput,
  saveHandler,
  defaultTimeHandler,
  customTimeHandler,
  switchTabs,
}: SettingsContainerInterface) {
  return (
    <div
      className={styles.settingsContainer}
      style={{
        transition: "all 0.5s ease-in-out",
        opacity: isTimerRunning ? 0 : 1,
        display: isTimerRunning ? "none" : "block",
      }}
    >
      <TabButton
        className={
          !isCurrentTabUserGenerated ? styles.activeButton : styles.button
        }
        onClickHandler={() => switchTabs(USE_DEFAULT_GENERATED_TEXT)}
        label={"Use Generated Text"}
      />
      <TabButton
        className={
          isCurrentTabUserGenerated ? styles.activeButton : styles.button
        }
        onClickHandler={() => switchTabs(USE_USER_GENERATED_TEXT)}
        label={"Paste Your Own Text"}
      />

      <div className={styles.timeSettings}>
        <h2>Time Settings</h2>
        <div className={styles.timeOptions}>
          <TimeOptionsButton
            className={
              currentTimeInSeconds === 60
                ? styles.activeButton
                : styles.defaultButton
            }
            onClickHandler={() => defaultTimeHandler(60)}
            label={"  1 min"}
          /> 
            <TimeOptionsButton
            className={
              currentTimeInSeconds === 120
                ? styles.activeButton
                : styles.defaultButton
            }
            onClickHandler={() => defaultTimeHandler(120)}
            label={"2 min"}
          />  
           <TimeOptionsButton
            className={
              currentTimeInSeconds === 300
                ? styles.activeButton
                : styles.defaultButton
            }
            onClickHandler={() => defaultTimeHandler(300)}
            label={"5 min"}
          />  
            <TimeOptionsButton
            className={
              isCustomTimerEnabled && !isInputDisabled
              ? styles.activeButton
              : styles.defaultButton
            }
            onClickHandler={customTimeHandler}
            label={"Custom"}
          />  
          {isCustomTimerEnabled && (
            <div className={styles.customSettings}>
              <input
                type="range"
                min={6}
                max={60}
                step="1"
                value={customTimer}
                onInput={handleSliderInput}
                className={styles.inputRange}
              />
              <p>{customTimer} mins</p>
              <p onClick={() => saveHandler()}>Save</p>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default SettingsContainer;

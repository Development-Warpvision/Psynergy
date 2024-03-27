import { FunctionComponent } from "react";
import styles from "./AdminSettings.module.css";
import Switch from '@mui/material/Switch';

const AdminSettings: FunctionComponent = () => {
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  return (
    <div className={styles.adminSettings}>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
      </div>
      <div className={styles.chatSettingsWrapper}>
        <div className={styles.chatSettings}>Chat Settings</div>
      </div>
      <div className={styles.notificationSettingsWrapper}>
        <div className={styles.chatSettings}>Notification Settings</div>
      </div>
      <div className={styles.enterIsSend}>Enter is Send</div>
      <div className={styles.enterKeyWillSendYouMessagWrapper}>
        <div className={styles.chatSettings}>
          Enter Key will send you messages
        </div>
      </div>
      {/* <img className={styles.adminSettingsChild} alt="" src="/group-2.svg" /> */}
      <Switch {...label} className={styles.adminSettingsChild} defaultChecked color="success" />
      <div className={styles.mediaVisibility}>Media Visibility</div>
      <div className={styles.showNewlyDownloadedMediaInWrapper}>
        <div className={styles.chatSettings}>
          Show Newly Downloaded media in your device’s gallery
        </div>
      </div>
      {/* <img className={styles.adminSettingsItem} alt="" src="/group-2.svg" /> */}
      <Switch {...label} className={styles.adminSettingsItem} defaultChecked color="success" />
      <div className={styles.disableenableNotifications}>
        Disable/Enable Notifications
      </div>
      <div className={styles.notificationsWillNotBeShowWrapper}>
        <div className={styles.chatSettings}>
          Notifications will not be shown to you
        </div>
      </div>
      {/* <img className={styles.adminSettingsInner} alt="" src="/group-2.svg" /> */}
      <Switch {...label} className={styles.adminSettingsInner} defaultChecked color="success" />
      <img className={styles.helpIcon} alt="" src="/help.svg" />
      <div className={styles.helpSupport}>{`Help & Support`}</div>
      <div className={styles.aboutUsWrapper}>
        <div className={styles.chatSettings}>About Us</div>
      </div>
      <div className={styles.contactUsWrapper}>
        <div className={styles.chatSettings}>Contact Us</div>
      </div>
      <div className={styles.ellipseDiv} />
      <div className={styles.adminSettingsChild1} />
    </div>
  );
};

export default AdminSettings;

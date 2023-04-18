import { ShowFnOutput, useModal } from "mui-modal-provider";
import { ComponentType, useCallback } from "react";
import { useCurrentUser } from "../../../utils/hooks";
// import { generatePath, Params, useNavigate } from "react-router-dom";
import { UseMLModalOptions } from "./types";

type tzData = {
  action: string;
  urlReferer?: string;
  urlDestination?: string;
  userId?: string | number;
  tzid?: string;
};

const lastDelayedTrack = {
  event: null as unknown as tzData,
  timeout: null as unknown as ReturnType<typeof setTimeout>,
};

const sendTz = (data: tzData) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch("https://zignaly.com/api/fe/tz.php", options);
};

const delayTimeout = 100;

/**
 * We have a problem with delayed track
 * because we track buttons and links AND we track url changed
 * @param data
 */
const sendTzDelayed = (data: tzData) => {
  if (
    lastDelayedTrack.event?.userId === data?.userId &&
    data.urlDestination?.indexOf(
      lastDelayedTrack.event?.urlDestination + "#"
    ) === 0
  ) {
    // if the timeout has already executed, no harm no foul
    clearTimeout(lastDelayedTrack.timeout);
  }
  lastDelayedTrack.event = data;
  lastDelayedTrack.timeout = setTimeout(() => sendTz(data), delayTimeout);
};

/**
 * Trigger internal tracking event.
 */
const triggerTz = async (
  location: string,
  userId?: string,
  referrer?: string
) => {
  if (process.env.REACT_APP_ENABLE_TRACKING !== "true") return;

  const data = {
    action: "sData",
    urlReferer: referrer,
    urlDestination: location,
    userId,
    tid: localStorage.getItem("tid"),
  };

  if (!data.tid) {
    // get tid
    const response = await sendTz({
      action: "gTid",
    });
    const json = await response.json();
    if (!response.ok) {
      throw json.error || json;
    }
    data.tid = json;
    localStorage.setItem("tid", json);
  }

  await sendTzDelayed(data);
};

let referrer = document.referrer;
export const track = ({
  location = "",
  ctaId = "",
  hash = "",
  userId = "",
}: {
  location?: string;
  hash?: string;
  ctaId?: string;
  userId?: string;
}) => {
  const url = new URL(location || window.location.href);
  url.hash =
    (hash || url.hash?.split("?")[0]) + (ctaId ? `?ctaId=${ctaId}` : "");
  triggerTz(url.toString(), userId, referrer);
  referrer = url.toString();
};

export const trackCta = ({
  ctaId = "",
  userId,
}: {
  ctaId: string;
  userId?: string;
}) => {
  const url = new URL(referrer);
  url.hash = url.hash?.split("?")[0] + `?ctaId=${ctaId}`;
  triggerTz(url.toString(), userId, referrer);
};

export function useMLModal(options?: UseMLModalOptions) {
  const { customClose, ...modalOptions } = options || {};
  const { showModal, ...etc } = useModal(modalOptions);
  const userId = useCurrentUser()?.id?.toString();
  const ourShowModal = useCallback(
    (
      Component: ComponentType & { trackId?: string },
      props?: Record<string, unknown> & { ctaId?: string }
    ) => {
      const { ctaId, ...modalProps } = props || {};
      const trackId = Component.trackId?.toLocaleLowerCase();
      trackId && track({ hash: trackId, userId, ctaId });
      const modal: ShowFnOutput<void> = showModal(Component, {
        ...modalProps,
        close: () => {
          trackId && track({ userId });
          customClose ? customClose(modal) : modal.destroy();
        },
      });
      return modal;
    },
    [showModal, userId]
  );

  return {
    ...etc,
    showModal: ourShowModal,
    originalShowModal: showModal,
  };
}

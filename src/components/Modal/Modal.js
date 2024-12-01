import React, { useState, useEffect, useRef, useCallback } from 'react';

import './style.scss';

const focusableElementSelectors =
  'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

export const Modal = ({
  id,
  visible: initialVisibility,
  labelledBy,
  describedBy,
  onCloseModal,
  previouslyFocusedElement,
  children,
}) => {
  const [visible, setVisible] = useState(initialVisibility);
  const [focusPosition, setFocusPosition] = useState(-1);
  const [focusableElements, setFocusableElements] = useState([]);
  const modalRef = useRef(null);

  const setAbilityToScroll = useCallback((isModalVisible) => {
    document.body.classList.toggle('body--modalVisible', isModalVisible);
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      const nodeList = modalRef.current.querySelectorAll(focusableElementSelectors);
      const focusableElements = Array.from(nodeList);
      setFocusableElements(focusableElements);
      if (focusableElements.length > 0) {
        focusableElements[0].focus(); // Focus on the first focusable element inside the modal
      }
    }
    setAbilityToScroll(visible);
  }, []);

  const updateFocusState = useCallback((newFocusPosition) => {
    setFocusPosition(newFocusPosition);
    focusableElements[newFocusPosition]?.focus();
  }, [focusableElements]);

  const closeModal = useCallback(() => {
    setVisible(false);
    previouslyFocusedElement.focus();
    setAbilityToScroll(false);
    onCloseModal();
  }, [setAbilityToScroll]);

  const handleKeyUp = useCallback((e) => {
    const keyActions = {
      Tab: () => {
        e.preventDefault();
        const newPosition = e.shiftKey
          ? (focusPosition - 1 + focusableElements.length) % focusableElements.length
          : (focusPosition + 1) % focusableElements.length;
        updateFocusState(newPosition);
      },
      ArrowUp: (e) => {
        e.preventDefault();
        const newPosition =
          (focusPosition - 1 + focusableElements.length) % focusableElements.length;
        updateFocusState(newPosition);
      },
      ArrowDown: (e) => {
        e.preventDefault();
        const newPosition = (focusPosition + 1) % focusableElements.length;
        updateFocusState(newPosition);
      },
      Escape: closeModal,
    };

    if (keyActions[e.key]) {
      keyActions[e.key](e);
    }
  }, [focusPosition, focusableElements, updateFocusState, closeModal]);

  const onClickOutside = useCallback((event) => {
    if (!modalRef.current?.contains(event.target)) {
      closeModal();
    }
  }, [closeModal]);

  /*
  useEffect(() => {
    // Store the focused element if the modal is visible initially
    if (initialVisible) {
      if (typeof document !== 'undefined') {
        activeElementBeforeModal.current = document.activeElement;
      }
    }

    // Toggle scrolling ability when the modal is opened
    document.body.classList.toggle('body--overlayed', initialVisible);

    // If modal is present, set up focusable elements
    if (modalRef.current) {
      const nodes = modalRef.current.querySelectorAll(focusableElementSelectors);
      setFocusableElements(Array.from(nodes));
      if (nodes.length > 0) {
        nodes[0].focus();
      }
    }

    // Attach event listeners for key handling
    const keyUpHandler = (e) => {
      const keyActions = {
        Tab: () => {
          e.preventDefault();
          const newPosition = e.shiftKey
            ? (focusPosition - 1 + focusableElements.length) % focusableElements.length
            : (focusPosition + 1) % focusableElements.length;
          setFocusPosition(newPosition);
          focusableElements[newPosition]?.focus();
        },
        Escape: closeModal,
      };

      if (keyActions[e.key]) {
        keyActions[e.key](e);
      }
    };

    document.addEventListener('keyup', keyUpHandler, true);

    // Cleanup
    return () => {
      document.removeEventListener('keyup', keyUpHandler, true);
    };
  }, [initialVisible, closeModal, focusPosition, focusableElements]);

  useEffect(() => {
    document.body.classList.toggle('body--overlayed', visible);
  }, [visible]);
*/

  if (!visible) {
    return null;
  }

  return (
    <div className="Modal__Background" onClick={onClickOutside}>
      <div
        id={id}
        className="Modal__Body"
        role="dialog"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        ref={modalRef}
      >
        <button className="Modal__CloseButton" type="button" aria-label="Close modal" onClick={closeModal} />
        <div className="Modal__Content">
          {children}
        </div>

      </div>
    </div>
  );
};

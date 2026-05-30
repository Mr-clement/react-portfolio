import {Dialog, Transition} from '@headlessui/react';
import {Bars3BottomRightIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import {FC, Fragment, memo, useCallback, useEffect, useMemo, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';

const navLabels: Partial<Record<SectionId, string>> = {
  [SectionId.About]: 'À propos',
  [SectionId.Resume]: 'CV',
  [SectionId.Portfolio]: 'Portfolio',
  [SectionId.Testimonials]: 'Témoignages',
  [SectionId.Contact]: 'Contact',
};

export const headerID = 'headerNav';

const Header: FC = memo(() => {
  const [currentSection, setCurrentSection] = useState<SectionId | null>(null);
  const [navLoaded, setNavLoaded] = useState(false);
  const navSections = useMemo(
    () => [SectionId.About, SectionId.Resume, SectionId.Portfolio, SectionId.Testimonials, SectionId.Contact],
    [],
  );

  const intersectionHandler = useCallback((section: SectionId | null) => {
    section && setCurrentSection(section);
  }, []);

  useNavObserver(navSections.map(section => `#${section}`).join(','), intersectionHandler);

  useEffect(() => {
    setNavLoaded(true);
  }, []);

  return (
    <>
      <MobileNav currentSection={currentSection} navSections={navSections} animate={navLoaded} />
      <DesktopNav currentSection={currentSection} navSections={navSections} animate={navLoaded} />
    </>
  );
});

const DesktopNav: FC<{navSections: SectionId[]; currentSection: SectionId | null; animate: boolean}> = memo(
  ({navSections, currentSection, animate}) => {
    const baseClass =
      '-m-1.5 p-1.5 rounded-md font-bold first-letter:uppercase hover:transition-colors hover:duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7bbcb4] sm:hover:text-[#7bbcb4] text-neutral-100';
    const activeClass = classNames(baseClass, 'text-[#7bbcb4]');
    const inactiveClass = classNames(baseClass, 'text-neutral-100');
    return (
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden w-[92%] max-w-4xl p-2 rounded-xl sm:block web3-navbar" id={headerID}>
          <nav className="flex justify-center gap-x-6">
          {navSections.map(section => (
            <NavItem
              activeClass={activeClass}
              animate={animate}
              current={section === currentSection}
              inactiveClass={inactiveClass}
              key={section}
              section={section}
            />
          ))}
        </nav>
      </header>
    );
  },
);

const MobileNav: FC<{navSections: SectionId[]; currentSection: SectionId | null; animate: boolean}> = memo(
  ({navSections, currentSection, animate}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
      setIsOpen(!isOpen);
    }, [isOpen]);

    const baseClass =
      'p-2 rounded-md first-letter:uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7bbcb4]';
    const activeClass = classNames(baseClass, 'bg-neutral-900 text-white font-bold');
    const inactiveClass = classNames(baseClass, 'text-neutral-200 font-medium');
    return (
      <>
        <button
              aria-label="Bouton du menu"
              className="fixed right-3 top-3 z-50 rounded-lg bg-gradient-to-br from-[#0b3f39] via-[#0b6b63] to-[#7bbcb4] p-2 ring-offset-gray-800/60 hover:scale-105 transform-gpu transition sm:hidden"
              onClick={toggleOpen}>
              <Bars3BottomRightIcon className="h-7 w-7 text-white drop-shadow" />
              <span className="sr-only">Ouvrir le menu</span>
            </button>
        <Transition.Root as={Fragment} show={isOpen}>
          <Dialog as="div" className="fixed inset-0 z-40 flex sm:hidden" onClose={toggleOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-stone-900 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <div className="relative w-4/5 bg-stone-800">
                <nav className="mt-5 flex flex-col gap-y-2 px-2">
                  {navSections.map(section => (
                    <NavItem
                      activeClass={activeClass}
                      animate={animate}
                      current={section === currentSection}
                      inactiveClass={inactiveClass}
                      key={section}
                      onClick={toggleOpen}
                      section={section}
                    />
                  ))}
                </nav>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </>
    );
  },
);

const NavItem: FC<{
  section: SectionId;
  current: boolean;
  activeClass: string;
  inactiveClass: string;
  animate: boolean;
  onClick?: () => void;
}> = memo(({section, current, inactiveClass, activeClass, animate, onClick}) => {
  return (
    <Link
      className={classNames('group relative inline-block', current ? activeClass : inactiveClass, 'transition-all duration-500 nav-neon', {
        'opacity-100 translate-x-0': animate,
        'opacity-0 translate-x-4': !animate,
      })}
      href={`/#${section}`}
      key={section}
      onClick={onClick}>
      <span className="relative z-10">{navLabels[section]}</span>
      <span className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-[#7bbcb4] to-[#8dded7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden />
    </Link>
  );
});

Header.displayName = 'Header';
export default Header;

import classNames from 'classnames';
import Image from 'next/image';
import {FC, memo} from 'react';

import {aboutData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import {useRevealOnVisible} from '../../hooks/useRevealOnVisible';

const About: FC = memo(() => {
  const {profileImageSrc, description, aboutItems} = aboutData;
  const {ref: imageRef, isVisible: isImageVisible} = useRevealOnVisible<HTMLDivElement>();
  const {ref: textRef, isVisible: isTextVisible} = useRevealOnVisible<HTMLDivElement>();
  const {ref: itemsRef, isVisible: areItemsVisible} = useRevealOnVisible<HTMLUListElement>();

  return (
    <Section className="bg-neutral-800 lg:pl-56" sectionId={SectionId.About}>
      <div className="hidden lg:block">
        <div className="fixed left-0 top-[20vh] z-10 flex h-[60vh] w-52 items-center justify-center px-4">
          <div className="h-full w-full overflow-hidden rounded-r-3xl border-r border-gray-600/40 bg-slate-950/20 p-5 text-left shadow-[inset_0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="animate-vertical-scroll-slow flex h-full flex-col gap-y-5 text-[0.82rem] font-semibold uppercase leading-6 tracking-[0.18em] text-[#9dd4c2]/85">
              {[description, description].map((text, idx) => (
                <span key={`about-side-${idx}`} className="block whitespace-pre-wrap">{text}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-4">
        {!!profileImageSrc && (
          <div
            ref={imageRef}
            className={classNames(
              'col-span-1 flex justify-center md:justify-start transition-all duration-700 ease-out',
              isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            )}>
            <div className="relative h-24 w-24 overflow-hidden rounded-xl md:h-32 md:w-32">
              <Image alt="about-me-image" className="h-full w-full object-cover" src={profileImageSrc} />
            </div>
          </div>
        )}

        <div className={classNames('col-span-1 flex flex-col gap-y-6', {'md:col-span-3': !!profileImageSrc})}>
          <div
            ref={textRef}
            className={classNames(
              'flex flex-col gap-y-2 transition-all duration-700 ease-out',
              isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            )}>
            <h2 className="text-2xl font-bold text-white">À propos</h2>
            <p className="prose prose-sm text-gray-300 sm:prose-base">{description}</p>
          </div>

          <ul ref={itemsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aboutItems.map(({label, text, Icon}, idx) => (
              <li
                className={classNames(
                  'col-span-1 flex items-start gap-x-2 transition-all duration-500 ease-out',
                  areItemsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                )}
                key={idx}
                style={{transitionDelay: `${idx * 100 + 200}ms`}}>
                {Icon && <Icon className="h-5 w-5 text-white" />}
                <span className="text-sm font-bold text-white">{label}:</span>
                <span className="text-sm text-gray-300">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
});

About.displayName = 'About';
export default About;

import {FC, memo, PropsWithChildren, useMemo} from 'react';

import {Skill as SkillType, SkillGroup as SkillGroupType} from '../../../data/dataDef';
import {useRevealOnVisible} from '../../../hooks/useRevealOnVisible';

export const SkillGroup: FC<PropsWithChildren<{skillGroup: SkillGroupType}>> = memo(({skillGroup}) => {
  const {ref, isVisible} = useRevealOnVisible<HTMLDivElement>();
  const {name, skills} = skillGroup;
  return (
    <div className="flex flex-col" ref={ref}>
      <span className="text-center text-lg font-bold">{name}</span>
      <div className="flex flex-col gap-y-3 mt-3">
        {skills.map((skill, index) => (
          <Skill index={index} key={`${skill.name}-${index}`} reveal={isVisible} skill={skill} />
        ))}
      </div>
    </div>
  );
});

SkillGroup.displayName = 'SkillGroup';

export const Skill: FC<{skill: SkillType; index?: number; reveal?: boolean}> = memo(
  ({skill, index = 0, reveal = false}) => {
    const {name, level, max = 10} = skill;
    const percentage = useMemo(() => Math.round((level / max) * 100), [level, max]);
    const delay = `${index * 300}ms`;

    return (
      <div aria-hidden className="flex flex-col">
        <div className="flex items-center justify-between">
          <span className="ml-2 text-sm font-medium">{name}</span>
          <span className="text-xs text-white/60 mr-2">{percentage}%</span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-700 mt-2">
          <div
            className="h-full rounded-full bg-[#7bbcb4] transition-[width] duration-900 ease-out"
            style={{width: reveal ? `${percentage}%` : '0%', transitionDelay: reveal ? delay : '0ms'}}
          />
        </div>
      </div>
    );
  },
);

Skill.displayName = 'Skill';

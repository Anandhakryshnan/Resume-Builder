import { useResume } from '../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import type { SkillCategory } from '../../types/resume';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

export const SkillsForm = () => {
  const { state, dispatch } = useResume();
  const { skills } = state;

  const handleAddCategory = () => {
    const newCategory: SkillCategory = {
      id: uuidv4(),
      name: '',
      skills: [],
    };
    dispatch({ type: 'ADD_SKILL_CATEGORY', payload: newCategory });
  };

  const handleDeleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_SKILL_CATEGORY', payload: id });
  };

  const handleChangeCategory = (id: string, name: string) => {
    dispatch({
      type: 'UPDATE_SKILL_CATEGORY',
      payload: { id, data: { name } },
    });
  };

  const handleAddSkill = (categoryId: string) => {
    const category = skills.find(c => c.id === categoryId);
    if (category) {
      const updatedSkills = [...category.skills, { id: uuidv4(), name: '' }];
      dispatch({
        type: 'UPDATE_SKILL_CATEGORY',
        payload: { id: categoryId, data: { skills: updatedSkills } },
      });
    }
  };

  const handleUpdateSkill = (categoryId: string, skillId: string, name: string) => {
    const category = skills.find(c => c.id === categoryId);
    if (category) {
      const updatedSkills = category.skills.map(s => s.id === skillId ? { ...s, name } : s);
      dispatch({
        type: 'UPDATE_SKILL_CATEGORY',
        payload: { id: categoryId, data: { skills: updatedSkills } },
      });
    }
  };

  const handleDeleteSkill = (categoryId: string, skillId: string) => {
    const category = skills.find(c => c.id === categoryId);
    if (category) {
      const updatedSkills = category.skills.filter(s => s.id !== skillId);
      dispatch({
        type: 'UPDATE_SKILL_CATEGORY',
        payload: { id: categoryId, data: { skills: updatedSkills } },
      });
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(skills);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch({ type: 'REORDER_SKILL_CATEGORY', payload: items });
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skills-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
              {skills.map((category, index) => (
                <Draggable key={category.id} draggableId={category.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-5 border border-[var(--glass-border)] rounded-2xl bg-white/5 relative group hover:bg-white/10 transition-colors ${snapshot.isDragging ? 'shadow-lg ring-2 ring-white' : ''}`}
                    >
                      <div 
                        {...provided.dragHandleProps} 
                        className="absolute left-2 top-4 text-[var(--app-text-muted)] hover:text-slate-200 cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical size={18} />
                      </div>
          <button
            onClick={() => handleDeleteCategory(category.id)}
            className="absolute top-4 right-4 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
            title="Delete Category"
          >
            <Trash2 size={18} />
          </button>
          
          <div className="pl-6 pr-8 mb-4">
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleChangeCategory(category.id, e.target.value)}
              className="w-full px-4 py-2 text-lg font-bold border-b-2 border-white/20 focus:border-white focus:outline-none bg-transparent text-slate-100 placeholder-slate-500 transition-all duration-300"
              placeholder="Skill Category (e.g., Frontend)"
            />
          </div>
          
          <div className="space-y-2">
            {category.skills.map((skill) => (
              <div key={skill.id} className="flex gap-2">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleUpdateSkill(category.id, skill.id, e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                  placeholder="Skill name"
                />
                <button
                  onClick={() => handleDeleteSkill(category.id, skill.id)}
                  className="p-1.5 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddSkill(category.id)}
              className="text-sm text-[var(--app-text)] hover:text-gray-300 mt-2 inline-flex items-center gap-1"
            >
              <Plus size={14} /> Add Skill
            </button>
          </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={handleAddCategory}
        className="w-full py-3.5 border-2 border-dashed border-white/20 rounded-xl text-[var(--app-text)] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        <Plus size={18} /> Add Category
      </button>
    </div>
  );
};

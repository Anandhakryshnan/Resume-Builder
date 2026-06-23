import { useResume } from '../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import type { WorkExperience } from '../../types/resume';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

export const WorkExperienceForm = () => {
  const { state, dispatch } = useResume();
  const { workExperience } = state;

  const handleAdd = () => {
    const newExp: WorkExperience = {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      summary: '',
      bulletPoints: [],
    };
    dispatch({ type: 'ADD_WORK_EXPERIENCE', payload: newExp });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_WORK_EXPERIENCE', payload: id });
  };

  const handleChange = (id: string, field: keyof WorkExperience, value: any) => {
    dispatch({
      type: 'UPDATE_WORK_EXPERIENCE',
      payload: { id, data: { [field]: value } },
    });
  };

  const handleAddBullet = (expId: string) => {
    const exp = workExperience.find(e => e.id === expId);
    if (exp) {
      handleChange(expId, 'bulletPoints', [...exp.bulletPoints, { id: uuidv4(), text: '' }]);
    }
  };

  const handleUpdateBullet = (expId: string, bulletId: string, text: string) => {
    const exp = workExperience.find(e => e.id === expId);
    if (exp) {
      const updatedBullets = exp.bulletPoints.map(b => b.id === bulletId ? { ...b, text } : b);
      handleChange(expId, 'bulletPoints', updatedBullets);
    }
  };

  const handleDeleteBullet = (expId: string, bulletId: string) => {
    const exp = workExperience.find(e => e.id === expId);
    if (exp) {
      const updatedBullets = exp.bulletPoints.filter(b => b.id !== bulletId);
      handleChange(expId, 'bulletPoints', updatedBullets);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(workExperience);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch({ type: 'REORDER_WORK_EXPERIENCE', payload: items });
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="work-experience-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
              {workExperience.map((exp, index) => (
                <Draggable key={exp.id} draggableId={exp.id} index={index}>
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
                        onClick={() => handleDelete(exp.id)}
                        className="absolute top-4 right-4 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
                        title="Delete Experience"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <h3 className="text-sm font-semibold text-slate-200 mb-4 pl-6 pr-8">Experience {index + 1}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 pl-6">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Company Name"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Position</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Job Title"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">End Date</label>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Present"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Summary</label>
                          <textarea
                            value={exp.summary}
                            onChange={(e) => handleChange(exp.id, 'summary', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300 resize-y"
                            placeholder="Brief description of your role..."
                          />
                        </div>
                        
                        <div className="col-span-2 space-y-2 mt-2">
                          <label className="block text-sm font-medium text-[var(--app-text)]">Bullet Points</label>
                          {exp.bulletPoints.map((bullet) => (
                            <div key={bullet.id} className="flex gap-2">
                              <input
                                type="text"
                                value={bullet.text}
                                onChange={(e) => handleUpdateBullet(exp.id, bullet.id, e.target.value)}
                                className="flex-1 px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                                placeholder="Achieved X by doing Y..."
                              />
                              <button
                                onClick={() => handleDeleteBullet(exp.id, bullet.id)}
                                className="p-1.5 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => handleAddBullet(exp.id)}
                            className="text-sm text-[var(--app-text)] hover:text-gray-300 mt-2 inline-flex items-center gap-1"
                          >
                            <Plus size={14} /> Add Bullet Point
                          </button>
                        </div>
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
        onClick={handleAdd}
        className="w-full py-3.5 border-2 border-dashed border-white/20 rounded-xl text-[var(--app-text)] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        <Plus size={18} /> Add Experience
      </button>
    </div>
  );
};

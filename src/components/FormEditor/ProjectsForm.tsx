import { useResume } from '../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import type { Project } from '../../types/resume';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

export const ProjectsForm = () => {
  const { state, dispatch } = useResume();
  const { projects } = state;

  const handleAdd = () => {
    const newProject: Project = {
      id: uuidv4(),
      title: '',
      role: '',
      techStack: [],
      description: '',
      link: '',
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  };

  const handleChange = (id: string, field: keyof Project, value: any) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, data: { [field]: value } },
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch({ type: 'REORDER_PROJECT', payload: items });
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
              {projects.map((proj, index) => (
                <Draggable key={proj.id} draggableId={proj.id} index={index}>
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
            onClick={() => handleDelete(proj.id)}
            className="absolute top-4 right-4 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
            title="Delete Project"
          >
            <Trash2 size={18} />
          </button>
          
          <h3 className="text-sm font-semibold text-slate-200 mb-4 pl-6 pr-8">Project {index + 1}</h3>
          
          <div className="grid grid-cols-2 gap-4 pl-6">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Project Title</label>
              <input
                type="text"
                value={proj.title}
                onChange={(e) => handleChange(proj.id, 'title', e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                placeholder="Awesome App"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Your Role</label>
              <input
                type="text"
                value={proj.role}
                onChange={(e) => handleChange(proj.id, 'role', e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                placeholder="Lead Developer"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Project Link</label>
              <input
                type="text"
                value={proj.link}
                onChange={(e) => handleChange(proj.id, 'link', e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                placeholder="https://github.com/your/repo"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={proj.techStack.join(', ')}
                onChange={(e) => {
                  const stack = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  handleChange(proj.id, 'techStack', stack);
                }}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                placeholder="React, TypeScript, Node.js"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Description</label>
              <textarea
                value={proj.description}
                onChange={(e) => handleChange(proj.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300 resize-y"
                placeholder="What did this project achieve?"
              />
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
        <Plus size={18} /> Add Project
      </button>
    </div>
  );
};

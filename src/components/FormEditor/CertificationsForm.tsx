import { useResume } from '../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import type { Certification } from '../../types/resume';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

export const CertificationsForm = () => {
  const { state, dispatch } = useResume();
  const { certifications } = state;

  const handleAdd = () => {
    const newCert: Certification = {
      id: uuidv4(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    dispatch({ type: 'ADD_CERTIFICATION', payload: newCert });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_CERTIFICATION', payload: id });
  };

  const handleChange = (id: string, field: keyof Certification, value: string) => {
    dispatch({
      type: 'UPDATE_CERTIFICATION',
      payload: { id, data: { [field]: value } },
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(certifications || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch({ type: 'REORDER_CERTIFICATIONS', payload: items });
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="certifications-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
              {(certifications || []).map((cert, index) => (
                <Draggable key={cert.id} draggableId={cert.id} index={index}>
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
                        onClick={() => handleDelete(cert.id)}
                        className="absolute top-4 right-4 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
                        title="Delete Certification"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <h3 className="text-sm font-semibold text-slate-200 mb-4 pl-6 pr-8">Certification {index + 1}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 pl-6">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Certification Name</label>
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Issuer</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Amazon Web Services"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Date</label>
                          <input
                            type="text"
                            value={cert.date}
                            onChange={(e) => handleChange(cert.id, 'date', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="2023"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">URL / Link</label>
                          <input
                            type="text"
                            value={cert.url}
                            onChange={(e) => handleChange(cert.id, 'url', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="https://credential.net/..."
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
        <Plus size={18} /> Add Certification
      </button>
    </div>
  );
};

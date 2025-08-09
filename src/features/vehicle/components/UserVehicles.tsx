import React, {useCallback, useState} from "react";
import {useSelector} from "react-redux";

import type {AddNewVehiclePayload, UpdateVehiclePayload, Vehicle} from "../types/vehicle.ts";
import {useAddVehicle, useDeleteVehicle, useGetUserVehicles, useUpdateVehicle} from "../hooks/useVehicle.ts";
import {selectUserId} from "../../user/selectors/userSelectors.ts";
import Title from "../../../shared/components/basic/Title.tsx";
import VehicleCard from "./VehicleCard.tsx";
import Modal from "../../../shared/components/modals/Modal.tsx";
import VehicleForm from "./VehicleForm.tsx";
import ConfirmationModal from "../../../shared/components/modals/ConfirmationModal.tsx";

interface AddVehicleCardProps {
    onClick: () => void;
}

const AddVehicleCard: React.FC<AddVehicleCardProps> = ({onClick}) => {
    return (
        <div
            className="border-1 border-[#E8F2E8] border-dashed p-4 rounded-xl space-y-4 flex flex-col items-center justify-center w-[332px] h-[400px] gap-4 cursor-pointer hover:border-[#598C59] hover:bg-[#F8FBF8] transition-colors duration-200"
            onClick={onClick}
        >
            <div className="flex flex-col items-center justify-center h-[200px] w-[300px]">
                <div
                    className="w-16 h-16 rounded-full border-2 border-[#598C59] flex items-center justify-center mb-4">
                    <svg
                        className="w-8 h-8 text-[#598C59]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </div>
                <h4 className="font-bold text-[#598C59] text-lg">Add New Vehicle</h4>
                <p className="text-sm text-[#0D141C] opacity-70">Click to add a vehicle</p>
            </div>
        </div>
    )
}

const UserVehicles = () => {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [newVehicle, setNewVehicle] = useState<AddNewVehiclePayload>({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        license_plate: '',
        color: '',
        vehicle_ai_image: '',
        seating_capacity: 2,
    });
    const [editedVehicle, setEditedVehicle] = useState<UpdateVehiclePayload>({});
    const [activeModal, setActiveModal] = useState<'add' | 'edit' | 'delete' | null>(null);
    const userId = useSelector(selectUserId);
    const {isLoading, isError, data} = useGetUserVehicles(userId);
    const addNewVehicleMutation = useAddVehicle();
    const updateVehicle = useUpdateVehicle();
    const deleteVehicle = useDeleteVehicle();

    const handleEditCard = useCallback((vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setEditedVehicle({
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            license_plate: vehicle.license_plate,
            color: vehicle.color,
            seating_capacity: vehicle.seating_capacity,
        });
        setActiveModal('edit');
    }, []);

    const handleDeleteCard = useCallback((vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setActiveModal('delete');
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setActiveModal(null);
        setSelectedVehicle(null);
        setEditedVehicle({});
    }, []);

    const handleCloseDeleteModal = useCallback(() => {
        setActiveModal(null);
        setSelectedVehicle(null);
    }, []);

    const handleUpdateVehicle = useCallback(async () => {
        if (selectedVehicle && editedVehicle) {
            try {
                await updateVehicle.mutateAsync({
                    vehicleId: selectedVehicle.vehicle_id,
                    vehiclePayload: editedVehicle
                });
                handleCloseEditModal();
            } catch (error) {
                console.error('Failed to update vehicle: ', error);
            }
        }
    }, [selectedVehicle, editedVehicle, updateVehicle, handleCloseEditModal]);

    const handleNewVehicle = useCallback(async () => {
        try {
            await addNewVehicleMutation.mutateAsync({newVehiclePayload: newVehicle});
            setNewVehicle({
                make: '',
                model: '',
                year: new Date().getFullYear(),
                license_plate: '',
                color: '',
                vehicle_ai_image: '',
                seating_capacity: 2,
            });
            setActiveModal(null);
        } catch (error) {
            console.error('Failed to add new vehicle: ', error);
        }
    }, [addNewVehicleMutation, newVehicle])

    const handleDeleteVehicle = useCallback(async () => {
        if (selectedVehicle) {
            try {
                await deleteVehicle.mutateAsync({
                    vehicleId: selectedVehicle.vehicle_id,
                    userId: selectedVehicle.driver_id
                });
                handleCloseDeleteModal();
            } catch (error) {
                console.error('Failed to delete vehicle: ', error);
            }
        }
    }, [deleteVehicle, handleCloseDeleteModal, selectedVehicle])

    if (isLoading) {
        return <div>Loading User Vehicles</div>
    }

    if (isError) {
        return <div>Error Loading User Vehicles</div>
    }

    return (
        <div className="border-1 border-[#E8F2E8] p-4 rounded-xl space-y-4">
            <Title title={"Vehicles"}/>
            {
                data?.data?.length === 0 ? (
                    <AddVehicleCard onClick={() => setActiveModal('add')}/>
                ) : (
                    <div className="overflow-x-auto hide-scrollbar w-full">
                        <div className="flex gap-2 flex-nowrap">
                            <AddVehicleCard onClick={() => setActiveModal('add')}/>
                            {data?.data?.map((vehicle) => (
                                <div key={vehicle.vehicle_id} className="flex-shrink-0">
                                    <VehicleCard
                                        vehicle={vehicle}
                                        isEditable={true}
                                        onUpdate={() => handleEditCard(vehicle)}
                                        onDelete={() => handleDeleteCard(vehicle)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            <Modal
                isOpen={activeModal === 'edit'}
                onClose={handleCloseEditModal}
                onSave={handleUpdateVehicle}
                title="Update Vehicle"
                saveText={updateVehicle.isPending ? "Updating..." : "Update Vehicle"}
                saveDisabled={updateVehicle.isPending}
            >
                {editedVehicle && (
                    <VehicleForm
                        vehicle={editedVehicle}
                        setVehicle={setEditedVehicle}
                    />
                )}
            </Modal>
            <Modal
                isOpen={activeModal === 'add'}
                onClose={() => setActiveModal(null)}
                onSave={handleNewVehicle}
                title="Add New Vehicle"
                saveText={addNewVehicleMutation.isPending ? "Adding..." : "Add Vehicle"}
                saveDisabled={addNewVehicleMutation.isPending}
            >
                <VehicleForm
                    vehicle={newVehicle}
                    setVehicle={setNewVehicle}
                />
            </Modal>
            <ConfirmationModal
                isOpen={activeModal === 'delete'}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteVehicle}
                type="danger"
                title="Delete Vehicle"
                message={`Are you sure you want to delete your Vehicle ${selectedVehicle?.license_plate}?`}
                confirmText="Yes"
                cancelText="Cancel"
            />
        </div>
    )
}

export default UserVehicles;
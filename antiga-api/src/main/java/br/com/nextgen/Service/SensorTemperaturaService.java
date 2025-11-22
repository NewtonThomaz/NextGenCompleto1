package br.com.nextgen.Service;

import br.com.nextgen.Entity.SensorTemperatura;
import br.com.nextgen.Repository.SensorTemperaturaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SensorTemperaturaService {

    private final SensorTemperaturaRepository sensorRepository;

    public SensorTemperaturaService(SensorTemperaturaRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<SensorTemperatura> listarTodos() {
        return sensorRepository.findAll();
    }

    public SensorTemperatura buscarPorId(UUID id) {
        Optional<SensorTemperatura> sensor = sensorRepository.findById(id);
        return sensor.orElse(null);
    }

    public SensorTemperatura salvar(SensorTemperatura sensor) {
        return sensorRepository.save(sensor);
    }

    public SensorTemperatura atualizar(UUID id, SensorTemperatura sensorAtualizado) {
        Optional<SensorTemperatura> sensorExistente = sensorRepository.findById(id);
        if (sensorExistente.isPresent()) {
            sensorAtualizado.setId(id);
            return sensorRepository.save(sensorAtualizado);
        }
        return null;
    }

    public Boolean deletar(UUID id) {
        Optional<SensorTemperatura> sensorExistente = sensorRepository.findById(id);
        if (sensorExistente.isPresent()) {
            sensorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
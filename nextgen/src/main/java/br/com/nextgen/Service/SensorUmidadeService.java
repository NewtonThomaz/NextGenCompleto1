package br.com.nextgen.Service;

import br.com.nextgen.Entity.SensorUmidade;
import br.com.nextgen.Repository.SensorUmidadeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SensorUmidadeService {

    private final SensorUmidadeRepository sensorRepository;

    public SensorUmidadeService(SensorUmidadeRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<SensorUmidade> listarTodos() {
        return sensorRepository.findAll();
    }

    public SensorUmidade buscarPorId(UUID id) {
        Optional<SensorUmidade> sensor = sensorRepository.findById(id);
        return sensor.orElse(null);
    }

    public SensorUmidade salvar(SensorUmidade sensor) {
        return sensorRepository.save(sensor);
    }

    public SensorUmidade atualizar(UUID id, SensorUmidade sensorAtualizado) {
        Optional<SensorUmidade> sensorExistente = sensorRepository.findById(id);
        if (sensorExistente.isPresent()) {
            sensorAtualizado.setId(id);
            return sensorRepository.save(sensorAtualizado);
        }
        return null;
    }

    public Boolean deletar(UUID id) {
        Optional<SensorUmidade> sensorExistente = sensorRepository.findById(id);
        if (sensorExistente.isPresent()) {
            sensorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}